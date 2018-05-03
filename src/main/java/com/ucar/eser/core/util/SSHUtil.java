package com.ucar.eser.core.util;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.SCPClient;
import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;

import com.ucar.eser.core.bean.MachineProtocol;
import com.ucar.eser.core.util.exception.IllegalParamException;
import com.ucar.eser.core.util.exception.SSHException;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


/**
 * Created by wangzhen on 2015/10/22
 */
public class SSHUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(SSHUtil.class);

    private final static String USERNAME = "";
    private final static String PASSWORD = "";



    /**
     * 判断目标主机是否能连接。方法返回前已经释放了所有资源，调用方不需要关心
     *
     * @param ip
     * @param port
     * @param userName
     * @param password
     * @throws Exception
     * @since 1.0.0
     */
    public static boolean isConnected(String ip, int port, String userName, String password) throws SSHException {
        if (StringUtils.isBlank(ip)) {
            try {
                throw new IllegalParamException("Param ip is empty!");
            } catch (IllegalParamException e) {
                throw new SSHException(e.getMessage(), e);
            }
        }
        port = IntegerUtil.defaultIfSmallerThan0(port, 22);
        userName = com.ucar.eser.core.util.StringUtils.defaultIfBlank(userName, USERNAME);
        password = com.ucar.eser.core.util.StringUtils.defaultIfBlank(password, PASSWORD);
        Connection conn = null;
        try {
            conn = new Connection(ip, port);
            conn.connect(null, 2000, 2000);
            return conn.authenticateWithPassword(userName, password);
        } catch (Exception e) {
            throw new SSHException("SSH error, ip: " + ip, e);
        } finally {
            if (null != conn)
                conn.close();
        }
    }


    /**
     * SSH 方式登录远程主机，执行命令,方法内部会关闭所有资源，调用方无须关心。
     *
     * @param ip       主机ip
     * @param username 用户名
     * @param password 密码
     * @param command  要执行的命令
     */
    public static String execute(String ip, int port, String username, String password, String command) throws SSHException {

        if (StringUtils.isBlank(command))
            return "";
        port = IntegerUtil.defaultIfSmallerThan0(port, 22);
        Connection conn = null;
        Session session = null;
        BufferedReader read = null;
        StringBuffer sb = new StringBuffer();
        try {
            if (StringUtils.isBlank(ip)) {
                throw new IllegalParamException("Param ip is empty!");
            }
            username = com.ucar.eser.core.util.StringUtils.defaultIfBlank(username, USERNAME);
            password = com.ucar.eser.core.util.StringUtils.defaultIfBlank(password, PASSWORD);
            conn = new Connection(ip, port);
            conn.connect(null, 6000, 6000);
            boolean isAuthenticated = conn.authenticateWithPassword(username, password);
            if (isAuthenticated == false) {
                throw new Exception("SSH authentication failed with [ userName: " + username + ", password: " + password + "]");
            }
            session = conn.openSession();
            session.execCommand(command);
            //stdout
            read = new BufferedReader(new InputStreamReader(new StreamGobbler(session.getStdout())));
            String line = "";
            int lineNumber = 1;
            while ((line = read.readLine()) != null) {
//                sb.append(line).append(BR);
                if (lineNumber++ > 1) {
                    sb.append("\n");
                }
                sb.append(line);
            }
            //stderr
            StringBuffer errorMsg = null;
            // 当获取结果为空时，再获取错误数据
            if (StringUtils.isBlank(sb.toString())) {
                errorMsg = new StringBuffer();
                read = new BufferedReader(new InputStreamReader(new StreamGobbler(session.getStderr())));
                while ((line = read.readLine()) != null) {
                    errorMsg.append(line);
                }
            }
            if (errorMsg != null && errorMsg.length() > 0) {
                // 返回错误信息
                sb.append(errorMsg.toString());
                LOGGER.error("command ({}), at host {} execute error, error message:{}", command, ip, errorMsg.toString());
            }
            return sb.toString();
        } catch (Exception e) {
            throw new SSHException("SSH远程执行command: " + command + " 出现错误: " + e.getMessage(), e);
        } finally {
            if (null != read) {
                try {
                    read.close();
                } catch (IOException e) {
                }
            }
            if (null != session)
                session.close();
            if (null != conn)
                conn.close();
        }
    }

    /**
     * 将
     *
     * @param ip
     * @param port
     * @param username
     * @param password
     * @param localPath
     * @param remoteDir
     * @return
     */
    public static boolean scpFileToRemote(String ip, int port, String username, String password, String localPath, String remoteDir) throws SSHException {
        boolean isSuccess = true;
        Connection connection = new Connection(ip, port);
        try {
            connection.connect();
            boolean isAuthed = connection.authenticateWithPassword(username, password);
            if (!isAuthed) {
                throw new SSHException("auth error.");
            }
            SCPClient scpClient = connection.createSCPClient();
            scpClient.put(localPath, remoteDir, "0644");
        } catch (IOException e) {
            isSuccess = false;
            throw new SSHException("scp file to remote error.", e);
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
        return isSuccess;
    }

    /**
     * 重载，使用默认端口、用户名和密码
     *
     * @param ip
     * @param localPath
     * @param remoteDir
     * @return
     */
    public static boolean scpFileToRemote(String ip, String localPath, String remoteDir) throws SSHException {
        return scpFileToRemote(ip, MachineProtocol.SSH_PORT, MachineProtocol.USERNAME, MachineProtocol.PASSWORD, localPath, remoteDir);
    }

    /**
     * 重载，使用默认端口、用户名和密码
     *
     * @param ip
     * @param cmd
     * @return
     */
    public static String execute(String ip, String cmd) throws SSHException {
        return execute(ip, MachineProtocol.SSH_PORT, MachineProtocol.USERNAME, MachineProtocol.PASSWORD, cmd);
    }

    /**
     * 查看机器ip上的端口port是否已被占用；
     *
     * @param ip   机器ip
     * @param port 要检查的端口
     * @return 如果被占用返回true，否则返回false；
     */
    public static boolean isPortUsed(String ip, int port) throws SSHException {
        /**
         * 执行ps命令，查看端口，以确认刚才执行的shell命令是否成功，返回一般是这样的：
         *  root     12510 12368  0 14:34 pts/0    00:00:00 redis-server *:6379
         */
        String psCmd = "/bin/ps -ef | grep %s | grep -v grep";
        psCmd = String.format(psCmd, port);
        String psResponse = execute(ip, psCmd);
        boolean isUsed = false;

        if (StringUtils.isNotBlank(psResponse)) {
            String[] resultArr = psResponse.split("\n");
            for (String resultLine : resultArr) {
                if (resultLine.contains(String.valueOf(port))) {
                    isUsed = true;
                    break;
                }
            }
        }
        return isUsed;
    }


}
