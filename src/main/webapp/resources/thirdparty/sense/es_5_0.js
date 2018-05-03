window.ES5DATA = {
	"es_5_0": {
		"name": "es_5_0",
		"globals": {
			"aliases": {
				"*": {
					"filter": {},
					"routing": "1",
					"search_routing": "1,2",
					"index_routing": "1"
				}
			},
			"aggregations": {
				"*": {
					"aggs": {
						"__template": {
							"NAME": {
								"AGG_TYPE": {}
							}
						}
					},
					"min": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"max": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"avg": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"sum": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"stats": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"extended_stats": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"value_count": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"script": {}
					},
					"global": {},
					"filter": {},
					"filters": {
						"__template": {
							"filters": {
								"NAME": {}
							}
						},
						"filters": {
							"*": {
								"__scope_link": "GLOBAL.filter"
							}
						},
						"other_bucket": {
							"__one_of": [true, false]
						},
						"other_bucket_key": ""
					},
					"missing": {
						"__template": {
							"field": ""
						},
						"field": "{field}"
					},
					"nested": {
						"__template": {
							"path": ""
						},
						"path": ""
					},
					"reverse_nested": {
						"__template": {
							"path": ""
						},
						"path": ""
					},
					"terms": {
						"__template": {
							"field": "",
							"size": 10
						},
						"field": "{field}",
						"size": 10,
						"shard_size": 10,
						"order": {
							"__template": {
								"_term": "asc"
							},
							"_term": {
								"__one_of": ["asc", "desc"]
							},
							"_count": {
								"__one_of": ["asc", "desc"]
							},
							"*": {
								"__one_of": ["asc", "desc"]
							}
						},
						"min_doc_count": 10,
						"script": {},
						"include": ".*",
						"exclude": ".*",
						"execution_hint": {
							"__one_of": ["map", "global_ordinals", "global_ordinals_hash", "global_ordinals_low_cardinality"]
						},
						"show_term_doc_count_error": {
							"__one_of": [true, false]
						},
						"collect_mode": {
							"__one_of": ["depth_first", "breadth_first"]
						},
						"missing": ""
					},
					"significant_terms": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"size": 10,
						"shard_size": 10,
						"shard_min_doc_count": 10,
						"min_doc_count": 10,
						"include": {
							"__one_of": ["*", {
								"pattern": "",
								"flags": ""
							}]
						},
						"exclude": {
							"__one_of": ["*", {
								"pattern": "",
								"flags": ""
							}]
						},
						"execution_hint": {
							"__one_of": ["map", "global_ordinals", "global_ordinals_hash"]
						},
						"background_filter": {
							"__scope_link": "GLOBAL.filter"
						},
						"mutual_information": {
							"include_negatives": {
								"__one_of": [true, false]
							}
						},
						"chi_square": {
							"include_negatives": {
								"__one_of": [true, false]
							},
							"background_is_superset": {
								"__one_of": [true, false]
							}
						},
						"percentage": {},
						"gnd": {
							"background_is_superset": {
								"__one_of": [true, false]
							}
						},
						"script_heuristic": {
							"__template": {
								"script": "_subset_freq/(_superset_freq - _subset_freq + 1)"
							},
							"script": {}
						}
					},
					"range": {
						"__template": {
							"field": "",
							"ranges": [{
								"from": 50,
								"to": 100
							}]
						},
						"field": "{field}",
						"ranges": [{
							"to": 50,
							"from": 100,
							"key": ""
						}],
						"keyed": {
							"__one_of": [true, false]
						},
						"script": {}
					},
					"date_range": {
						"__template": {
							"field": "",
							"ranges": [{
								"from": "now-10d/d",
								"to": "now"
							}]
						},
						"field": "{field}",
						"format": "MM-yyy",
						"ranges": [{
							"to": "",
							"from": "",
							"key": ""
						}],
						"keyed": {
							"__one_of": [true, false]
						},
						"script": {}
					},
					"ip_range": {
						"__template": {
							"field": "",
							"ranges": [{
								"from": "10.0.0.5",
								"to": "10.0.0.10"
							}]
						},
						"field": "{field}",
						"format": "MM-yyy",
						"ranges": [{
							"to": "",
							"from": "",
							"key": "",
							"mask": "10.0.0.127/25"
						}],
						"keyed": {
							"__one_of": [true, false]
						},
						"script": {}
					},
					"histogram": {
						"__template": {
							"field": "price",
							"interval": 50
						},
						"field": "{field}",
						"interval": 50,
						"min_doc_count": 0,
						"order": {
							"__template": {
								"_key": "asc"
							},
							"_key": {
								"__one_of": ["asc", "desc"]
							},
							"_count": {
								"__one_of": ["asc", "desc"]
							},
							"*": {
								"__one_of": ["asc", "desc"]
							}
						},
						"keyed": {
							"__one_of": [true, false]
						},
						"missing": 0
					},
					"date_histogram": {
						"__template": {
							"field": "date",
							"interval": "month"
						},
						"field": "{field}",
						"interval": {
							"__one_of": ["year", "quarter", "week", "day", "hour", "minute", "second"]
						},
						"min_doc_count": 0,
						"order": {
							"__template": {
								"_key": "asc"
							},
							"_key": {
								"__one_of": ["asc", "desc"]
							},
							"_count": {
								"__one_of": ["asc", "desc"]
							},
							"*": {
								"__one_of": ["asc", "desc"]
							}
						},
						"keyed": {
							"__one_of": [true, false]
						},
						"pre_zone": "-01:00",
						"post_zone": "-01:00",
						"pre_zone_adjust_large_interval": {
							"__one_of": [true, false]
						},
						"factor": 1000,
						"pre_offset": "1d",
						"post_offset": "1d",
						"format": "yyyy-MM-dd",
						"time_zone": "00:00",
						"missing": ""
					},
					"geo_distance": {
						"__template": {
							"field": "location",
							"origin": {
								"lat": 52.376,
								"lon": 4.894
							},
							"ranges": [{
								"from": 100,
								"to": 300
							}]
						},
						"field": "{field}",
						"origin": {
							"lat": 0,
							"lon": 0
						},
						"unit": {
							"__one_of": ["mi", "km", "in", "yd", "m", "cm", "mm"]
						},
						"ranges": [{
							"from": 50,
							"to": 100
						}],
						"distance_type": {
							"__one_of": ["arc", "sloppy_arc", "plane"]
						}
					},
					"geohash_grid": {
						"__template": {
							"field": "",
							"precision": 3
						},
						"field": "{field}",
						"precision": {
							"__one_of": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
						},
						"size": 10,
						"shard_size": 10
					},
					"percentiles": {
						"__template": {
							"field": "",
							"percents": [1, 5, 25, 50, 75, 95, 99]
						},
						"field": "{field}",
						"percents": {
							"__template": [1, 5, 25, 50, 75, 95, 99],
							"__any_of": []
						},
						"script": {},
						"compression": 100,
						"method": {
							"__one_of": ["hdr", "tdigest"]
						},
						"missing": 0
					},
					"cardinality": {
						"__template": {
							"field": ""
						},
						"precision_threshold": 100,
						"rehash": true,
						"script": {},
						"missing": ""
					},
					"scripted_metric": {
						"__template": {
							"init_script": "",
							"map_script": "",
							"combine_script": "",
							"reduce_script": ""
						},
						"init_script": {
							"__scope_link": "GLOBAL.script"
						},
						"map_script": {
							"__scope_link": "GLOBAL.script"
						},
						"combine_script": {
							"__scope_link": "GLOBAL.script"
						},
						"reduce_script": {
							"__scope_link": "GLOBAL.script"
						},
						"lang": "groovy",
						"params": {},
						"reduce_params": {}
					},
					"geo_bounds": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"wrap_longitude": {
							"__one_of": [true, false]
						}
					},
					"top_hits": {
						"__template": {
							"size": 10
						},
						"from": 0,
						"size": 10,
						"sort": {
							"__template": [],
							"__scope_link": "_search.sort"
						},
						"highlight": {},
						"explain": {
							"__one_of": [true, false]
						},
						"_source": {
							"__template": "",
							"__scope_link": "_search._source"
						},
						"script_fields": {
							"__scope_link": "_search.script_fields"
						},
						"docvalue_fields": ["{field}"],
						"version": {
							"__one_of": [true, false]
						}
					},
					"percentile_ranks": {
						"__template": {
							"field": "",
							"values": [10, 15]
						},
						"field": "{field}",
						"values": [],
						"script": {},
						"compression": 100,
						"method": {
							"__one_of": ["hdr", "tdigest"]
						},
						"missing": 0
					},
					"sampler": {
						"__template": {},
						"field": "{field}",
						"script": {},
						"shard_size": 100,
						"max_docs_per_value": 3,
						"execution_hint": {
							"__one_of": ["map", "global_ordinals", "bytes_hash"]
						}
					},
					"children": {
						"__template": {
							"type": ""
						},
						"type": ""
					},
					"derivative": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"avg_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"max_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"min_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"sum_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"moving_avg": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"window": 5,
						"model": {
							"__one_of": ["simple", "linear", "ewma", "holt", "holt_winters"]
						},
						"settings": {
							"type": {
								"__one_of": ["add", "mult"]
							},
							"alpha": 0.5,
							"beta": 0.5,
							"gamma": 0.5,
							"period": 7
						}
					},
					"cumulative_sum": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": ""
					},
					"serial_diff": {
						"__template": {
							"buckets_path": "",
							"lag": 7
						},
						"lag": 7,
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"buckets_path": "",
						"format": ""
					},
					"bucket_script": {
						"__template": {
							"buckets_path": "",
							"script": {}
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"script": {}
					},
					"bucket_selector": {
						"__template": {
							"buckets_path": "",
							"script": {}
						},
						"buckets_path": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"script": {}
					},
					"matrix_stats": {
						"__template": {
							"fields": []
						},
						"fields": ["{field}"]
					}
				}
			},
			"aggs": {
				"*": {
					"aggs": {
						"__template": {
							"NAME": {
								"AGG_TYPE": {}
							}
						}
					},
					"min": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"max": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"avg": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"sum": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"stats": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"extended_stats": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"missing": 0,
						"script": {}
					},
					"value_count": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"script": {}
					},
					"global": {},
					"filter": {},
					"filters": {
						"__template": {
							"filters": {
								"NAME": {}
							}
						},
						"filters": {
							"*": {
								"__scope_link": "GLOBAL.filter"
							}
						},
						"other_bucket": {
							"__one_of": [true, false]
						},
						"other_bucket_key": ""
					},
					"missing": {
						"__template": {
							"field": ""
						},
						"field": "{field}"
					},
					"nested": {
						"__template": {
							"path": ""
						},
						"path": ""
					},
					"reverse_nested": {
						"__template": {
							"path": ""
						},
						"path": ""
					},
					"terms": {
						"__template": {
							"field": "",
							"size": 10
						},
						"field": "{field}",
						"size": 10,
						"shard_size": 10,
						"order": {
							"__template": {
								"_term": "asc"
							},
							"_term": {
								"__one_of": ["asc", "desc"]
							},
							"_count": {
								"__one_of": ["asc", "desc"]
							},
							"*": {
								"__one_of": ["asc", "desc"]
							}
						},
						"min_doc_count": 10,
						"script": {},
						"include": ".*",
						"exclude": ".*",
						"execution_hint": {
							"__one_of": ["map", "global_ordinals", "global_ordinals_hash", "global_ordinals_low_cardinality"]
						},
						"show_term_doc_count_error": {
							"__one_of": [true, false]
						},
						"collect_mode": {
							"__one_of": ["depth_first", "breadth_first"]
						},
						"missing": ""
					},
					"significant_terms": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"size": 10,
						"shard_size": 10,
						"shard_min_doc_count": 10,
						"min_doc_count": 10,
						"include": {
							"__one_of": ["*", {
								"pattern": "",
								"flags": ""
							}]
						},
						"exclude": {
							"__one_of": ["*", {
								"pattern": "",
								"flags": ""
							}]
						},
						"execution_hint": {
							"__one_of": ["map", "global_ordinals", "global_ordinals_hash"]
						},
						"background_filter": {
							"__scope_link": "GLOBAL.filter"
						},
						"mutual_information": {
							"include_negatives": {
								"__one_of": [true, false]
							}
						},
						"chi_square": {
							"include_negatives": {
								"__one_of": [true, false]
							},
							"background_is_superset": {
								"__one_of": [true, false]
							}
						},
						"percentage": {},
						"gnd": {
							"background_is_superset": {
								"__one_of": [true, false]
							}
						},
						"script_heuristic": {
							"__template": {
								"script": "_subset_freq/(_superset_freq - _subset_freq + 1)"
							},
							"script": {}
						}
					},
					"range": {
						"__template": {
							"field": "",
							"ranges": [{
								"from": 50,
								"to": 100
							}]
						},
						"field": "{field}",
						"ranges": [{
							"to": 50,
							"from": 100,
							"key": ""
						}],
						"keyed": {
							"__one_of": [true, false]
						},
						"script": {}
					},
					"date_range": {
						"__template": {
							"field": "",
							"ranges": [{
								"from": "now-10d/d",
								"to": "now"
							}]
						},
						"field": "{field}",
						"format": "MM-yyy",
						"ranges": [{
							"to": "",
							"from": "",
							"key": ""
						}],
						"keyed": {
							"__one_of": [true, false]
						},
						"script": {}
					},
					"ip_range": {
						"__template": {
							"field": "",
							"ranges": [{
								"from": "10.0.0.5",
								"to": "10.0.0.10"
							}]
						},
						"field": "{field}",
						"format": "MM-yyy",
						"ranges": [{
							"to": "",
							"from": "",
							"key": "",
							"mask": "10.0.0.127/25"
						}],
						"keyed": {
							"__one_of": [true, false]
						},
						"script": {}
					},
					"histogram": {
						"__template": {
							"field": "price",
							"interval": 50
						},
						"field": "{field}",
						"interval": 50,
						"min_doc_count": 0,
						"order": {
							"__template": {
								"_key": "asc"
							},
							"_key": {
								"__one_of": ["asc", "desc"]
							},
							"_count": {
								"__one_of": ["asc", "desc"]
							},
							"*": {
								"__one_of": ["asc", "desc"]
							}
						},
						"keyed": {
							"__one_of": [true, false]
						},
						"missing": 0
					},
					"date_histogram": {
						"__template": {
							"field": "date",
							"interval": "month"
						},
						"field": "{field}",
						"interval": {
							"__one_of": ["year", "quarter", "week", "day", "hour", "minute", "second"]
						},
						"min_doc_count": 0,
						"order": {
							"__template": {
								"_key": "asc"
							},
							"_key": {
								"__one_of": ["asc", "desc"]
							},
							"_count": {
								"__one_of": ["asc", "desc"]
							},
							"*": {
								"__one_of": ["asc", "desc"]
							}
						},
						"keyed": {
							"__one_of": [true, false]
						},
						"pre_zone": "-01:00",
						"post_zone": "-01:00",
						"pre_zone_adjust_large_interval": {
							"__one_of": [true, false]
						},
						"factor": 1000,
						"pre_offset": "1d",
						"post_offset": "1d",
						"format": "yyyy-MM-dd",
						"time_zone": "00:00",
						"missing": ""
					},
					"geo_distance": {
						"__template": {
							"field": "location",
							"origin": {
								"lat": 52.376,
								"lon": 4.894
							},
							"ranges": [{
								"from": 100,
								"to": 300
							}]
						},
						"field": "{field}",
						"origin": {
							"lat": 0,
							"lon": 0
						},
						"unit": {
							"__one_of": ["mi", "km", "in", "yd", "m", "cm", "mm"]
						},
						"ranges": [{
							"from": 50,
							"to": 100
						}],
						"distance_type": {
							"__one_of": ["arc", "sloppy_arc", "plane"]
						}
					},
					"geohash_grid": {
						"__template": {
							"field": "",
							"precision": 3
						},
						"field": "{field}",
						"precision": {
							"__one_of": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
						},
						"size": 10,
						"shard_size": 10
					},
					"percentiles": {
						"__template": {
							"field": "",
							"percents": [1, 5, 25, 50, 75, 95, 99]
						},
						"field": "{field}",
						"percents": {
							"__template": [1, 5, 25, 50, 75, 95, 99],
							"__any_of": []
						},
						"script": {},
						"compression": 100,
						"method": {
							"__one_of": ["hdr", "tdigest"]
						},
						"missing": 0
					},
					"cardinality": {
						"__template": {
							"field": ""
						},
						"precision_threshold": 100,
						"rehash": true,
						"script": {},
						"missing": ""
					},
					"scripted_metric": {
						"__template": {
							"init_script": "",
							"map_script": "",
							"combine_script": "",
							"reduce_script": ""
						},
						"init_script": {
							"__scope_link": "GLOBAL.script"
						},
						"map_script": {
							"__scope_link": "GLOBAL.script"
						},
						"combine_script": {
							"__scope_link": "GLOBAL.script"
						},
						"reduce_script": {
							"__scope_link": "GLOBAL.script"
						},
						"lang": "groovy",
						"params": {},
						"reduce_params": {}
					},
					"geo_bounds": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"wrap_longitude": {
							"__one_of": [true, false]
						}
					},
					"top_hits": {
						"__template": {
							"size": 10
						},
						"from": 0,
						"size": 10,
						"sort": {
							"__template": [],
							"__scope_link": "_search.sort"
						},
						"highlight": {},
						"explain": {
							"__one_of": [true, false]
						},
						"_source": {
							"__template": "",
							"__scope_link": "_search._source"
						},
						"script_fields": {
							"__scope_link": "_search.script_fields"
						},
						"docvalue_fields": ["{field}"],
						"version": {
							"__one_of": [true, false]
						}
					},
					"percentile_ranks": {
						"__template": {
							"field": "",
							"values": [10, 15]
						},
						"field": "{field}",
						"values": [],
						"script": {},
						"compression": 100,
						"method": {
							"__one_of": ["hdr", "tdigest"]
						},
						"missing": 0
					},
					"sampler": {
						"__template": {},
						"field": "{field}",
						"script": {},
						"shard_size": 100,
						"max_docs_per_value": 3,
						"execution_hint": {
							"__one_of": ["map", "global_ordinals", "bytes_hash"]
						}
					},
					"children": {
						"__template": {
							"type": ""
						},
						"type": ""
					},
					"derivative": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"avg_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"max_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"min_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"sum_bucket": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						}
					},
					"moving_avg": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"window": 5,
						"model": {
							"__one_of": ["simple", "linear", "ewma", "holt", "holt_winters"]
						},
						"settings": {
							"type": {
								"__one_of": ["add", "mult"]
							},
							"alpha": 0.5,
							"beta": 0.5,
							"gamma": 0.5,
							"period": 7
						}
					},
					"cumulative_sum": {
						"__template": {
							"buckets_path": ""
						},
						"buckets_path": "",
						"format": ""
					},
					"serial_diff": {
						"__template": {
							"buckets_path": "",
							"lag": 7
						},
						"lag": 7,
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"buckets_path": "",
						"format": ""
					},
					"bucket_script": {
						"__template": {
							"buckets_path": "",
							"script": {}
						},
						"buckets_path": "",
						"format": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"script": {}
					},
					"bucket_selector": {
						"__template": {
							"buckets_path": "",
							"script": {}
						},
						"buckets_path": "",
						"gap_policy": {
							"__one_of": ["skip", "insert_zeros"]
						},
						"script": {}
					},
					"matrix_stats": {
						"__template": {
							"fields": []
						},
						"fields": ["{field}"]
					}
				}
			},
			"filter": {
				"and": {
					"__template": {
						"filters": [{}]
					},
					"filters": [{
						"__scope_link": "."
					}]
				},
				"bool": {
					"__scope_link": "GLOBAL.query"
				},
				"exists": {
					"__template": {
						"field": "FIELD_NAME"
					},
					"field": "{field}"
				},
				"ids": {
					"__template": {
						"values": ["ID"]
					},
					"type": "{type}",
					"values": [""]
				},
				"limit": {
					"__template": {
						"value": 100
					},
					"value": 100
				},
				"type": {
					"__template": {
						"value": "TYPE"
					},
					"value": "{type}"
				},
				"geo_bounding_box": {
					"__template": {
						"FIELD": {
							"top_left": {
								"lat": 40.73,
								"lon": -74.1
							},
							"bottom_right": {
								"lat": 40.717,
								"lon": -73.99
							}
						}
					},
					"{field}": {
						"top_left": {
							"lat": 40.73,
							"lon": -74.1
						},
						"bottom_right": {
							"lat": 40.73,
							"lon": -74.1
						}
					},
					"type": {
						"__one_of": ["memory", "indexed"]
					}
				},
				"geo_distance": {
					"__template": {
						"distance": 100,
						"distance_unit": "km",
						"FIELD": {
							"lat": 40.73,
							"lon": -74.1
						}
					},
					"distance": 100,
					"distance_unit": {
						"__one_of": ["km", "miles"]
					},
					"distance_type": {
						"__one_of": ["arc", "plane"]
					},
					"optimize_bbox": {
						"__one_of": ["memory", "indexed", "none"]
					},
					"{field}": {
						"lat": 40.73,
						"lon": -74.1
					}
				},
				"geo_distance_range": {
					"__template": {
						"from": 100,
						"to": 200,
						"distance_unit": "km",
						"FIELD": {
							"lat": 40.73,
							"lon": -74.1
						}
					},
					"from": 100,
					"to": 200,
					"distance_unit": {
						"__one_of": ["km", "miles"]
					},
					"distance_type": {
						"__one_of": ["arc", "plane"]
					},
					"include_lower": {
						"__one_of": [true, false]
					},
					"include_upper": {
						"__one_of": [true, false]
					},
					"{field}": {
						"lat": 40.73,
						"lon": -74.1
					}
				},
				"geo_polygon": {
					"__template": {
						"FIELD": {
							"points": [{
								"lat": 40.73,
								"lon": -74.1
							}, {
								"lat": 40.83,
								"lon": -75.1
							}]
						}
					},
					"{field}": {
						"points": [{
							"lat": 40.73,
							"lon": -74.1
						}]
					}
				},
				"geo_shape": {
					"__template": {
						"FIELD": {
							"shape": {
								"type": "envelope",
								"coordinates": [
									[-45, 45],
									[45, -45]
								]
							},
							"relation": "within"
						}
					},
					"{field}": {
						"shape": {
							"type": "",
							"coordinates": []
						},
						"indexed_shape": {
							"id": "",
							"index": "{index}",
							"type": "{type}",
							"shape_field_name": "shape"
						},
						"relation": {
							"__one_of": ["within", "intersects", "disjoint"]
						}
					}
				},
				"has_child": {
					"__template": {
						"type": "TYPE",
						"filter": {}
					},
					"type": "{type}",
					"query": {},
					"filter": {},
					"_scope": "",
					"min_children": 1,
					"max_children": 10
				},
				"has_parent": {
					"__template": {
						"parent_type": "TYPE",
						"filter": {}
					},
					"parent_type": "{type}",
					"query": {},
					"filter": {},
					"_scope": ""
				},
				"missing": {
					"__template": {
						"field": "FIELD"
					},
					"existence": {
						"__one_of": [true, false]
					},
					"null_value": {
						"__one_of": [true, false]
					},
					"field": "{field}"
				},
				"m": {
					"__template": {
						"field": "FIELD"
					},
					"existence": {
						"__one_of": [true, false]
					},
					"null_value": {
						"__one_of": [true, false]
					},
					"field": "{field}"
				},
				"not": {
					"__template": {
						"filter": {}
					},
					"filter": {}
				},
				"range": {
					"__template": {
						"FIELD": {
							"gte": 10,
							"lte": 20
						}
					},
					"{field}": {
						"gte": 1,
						"gt": 1,
						"lte": 20,
						"lt": 20,
						"time_zone": "+1:00",
						"format": "dd/MM/yyyy||yyyy",
						"execution": {
							"__one_of": ["index", "fielddata"]
						}
					}
				},
				"or": {
					"__template": {
						"filters": [{}]
					},
					"filters": [{
						"__scope_link": "."
					}]
				},
				"prefix": {
					"__template": {
						"FIELD": "VALUE"
					},
					"{field}": ""
				},
				"query": {},
				"script": {
					"__template": {
						"script": {}
					},
					"script": {}
				},
				"term": {
					"__template": {
						"FIELD": "VALUE"
					},
					"{field}": ""
				},
				"terms": {
					"__template": {
						"FIELD": ["VALUE1", "VALUE2"]
					},
					"field": ["{field}"],
					"execution": {
						"__one_of": ["plain", "bool", "and", "or", "bool_nocache", "and_nocache", "or_nocache"]
					}
				},
				"nested": {
					"__template": {
						"path": "path_to_nested_doc",
						"query": {}
					},
					"query": {},
					"path": "",
					"_name": ""
				}
			},
			"highlight": {
				"pre_tags": {},
				"post_tags": {},
				"tags_schema": {},
				"fields": {
					"{field}": {
						"fragment_size": 20,
						"number_of_fragments": 3
					}
				}
			},
			"script": {
				"__template": {
					"inline": "SCRIPT"
				},
				"inline": "SCRIPT",
				"file": "FILE_SCRIPT_NAME",
				"id": "SCRIPT_ID",
				"lang": "",
				"params": {}
			},
			"query": {
				"match": {
					"__template": {
						"FIELD": "TEXT"
					},
					"{field}": {
						"query": "",
						"operator": {
							"__one_of": ["and", "or"]
						},
						"type": {
							"__one_of": ["phrase", "phrase_prefix", "boolean"]
						},
						"max_expansions": 10,
						"analyzer": "",
						"fuzziness": 1,
						"prefix_length": 1
					}
				},
				"match_phrase": {
					"__template": {
						"FIELD": "PHRASE"
					},
					"{field}": {
						"query": "",
						"analyzer": ""
					}
				},
				"match_phrase_prefix": {
					"__template": {
						"FIELD": "PREFIX"
					},
					"{field}": {
						"query": "",
						"analyzer": "",
						"max_expansions": 10,
						"prefix_length": 1,
						"fuzziness": 0.1
					}
				},
				"multi_match": {
					"__template": {
						"query": "",
						"fields": []
					},
					"query": "",
					"fields": ["{field}"],
					"use_dis_max": {
						"__template": true,
						"__one_of": [true, false]
					},
					"tie_breaker": 0,
					"type": {
						"__one_of": ["best_fields", "most_fields", "cross_fields", "phrase", "phrase_prefix"]
					}
				},
				"bool": {
					"must": [{
						"__scope_link": "."
					}],
					"must_not": [{
						"__scope_link": "."
					}],
					"should": [{
						"__scope_link": "."
					}],
					"filter": {
						"__scope_link": "GLOBAL.filter"
					},
					"minimum_should_match": 1,
					"boost": 1
				},
				"boosting": {
					"positive": {
						"__scope_link": "."
					},
					"negative": {
						"__scope_link": "."
					},
					"negative_boost": 0.2
				},
				"ids": {
					"type": "",
					"values": []
				},
				"constant_score": {
					"__template": {
						"filter": {},
						"boost": 1.2
					},
					"query": {},
					"filter": {},
					"boost": 1.2
				},
				"dis_max": {
					"__template": {
						"tie_breaker": 0.7,
						"boost": 1.2,
						"queries": []
					},
					"tie_breaker": 0.7,
					"boost": 1.2,
					"queries": [{
						"__scope_link": "."
					}]
				},
				"field": {
					"{field}": {
						"query": "",
						"boost": 2,
						"enable_position_increments": {
							"__template": false,
							"__one_of": [true, false]
						}
					}
				},
				"fuzzy": {
					"{field}": {
						"value": "",
						"boost": 1,
						"fuzziness": 0.5,
						"prefix_length": 0
					}
				},
				"has_child": {
					"__template": {
						"type": "TYPE",
						"query": {}
					},
					"type": "{type}",
					"score_mode": {
						"__one_of": ["none", "max", "sum", "avg"]
					},
					"_scope": "",
					"query": {},
					"min_children": 1,
					"max_children": 10
				},
				"has_parent": {
					"__template": {
						"parent_type": "TYPE",
						"query": {}
					},
					"parent_type": "{type}",
					"score_mode": {
						"__one_of": ["none", "score"]
					},
					"_scope": "",
					"query": {}
				},
				"match_all": {},
				"more_like_this": {
					"__template": {
						"fields": ["FIELD"],
						"like_text": "text like this one",
						"min_term_freq": 1,
						"max_query_terms": 12
					},
					"fields": ["{field}"],
					"like_text": "",
					"percent_terms_to_match": 0.3,
					"min_term_freq": 2,
					"max_query_terms": 25,
					"stop_words": [""],
					"min_doc_freq": 5,
					"max_doc_freq": 100,
					"min_word_len": 0,
					"max_word_len": 0,
					"boost_terms": 1,
					"boost": 1,
					"analyzer": "",
					"docs": [{
						"_index": "{index}",
						"_type": "{type}",
						"_id": ""
					}],
					"ids": [""]
				},
				"mlt": {
					"__template": {
						"fields": ["FIELD"],
						"like_text": "text like this one",
						"min_term_freq": 1,
						"max_query_terms": 12
					},
					"__scope_link": ".more_like_this"
				},
				"prefix": {
					"__template": {
						"FIELD": {
							"value": ""
						}
					},
					"{field}": {
						"value": "",
						"boost": 1
					}
				},
				"query_string": {
					"__template": {
						"default_field": "FIELD",
						"query": "this AND that OR thus"
					},
					"query": "",
					"default_field": "{field}",
					"fields": ["{field}"],
					"default_operator": {
						"__one_of": ["OR", "AND"]
					},
					"analyzer": "",
					"allow_leading_wildcard": {
						"__one_of": [true, false]
					},
					"lowercase_expanded_terms": {
						"__one_of": [true, false]
					},
					"enable_position_increments": {
						"__one_of": [true, false]
					},
					"fuzzy_max_expansions": 50,
					"fuzziness": 0.5,
					"fuzzy_prefix_length": 0,
					"phrase_slop": 0,
					"boost": 1,
					"analyze_wildcard": {
						"__one_of": [false, true]
					},
					"auto_generate_phrase_queries": {
						"__one_of": [false, true]
					},
					"minimum_should_match": "20%",
					"lenient": {
						"__one_of": [false, true]
					},
					"use_dis_max": {
						"__one_of": [true, false]
					},
					"tie_breaker": 0,
					"time_zone": "+1:00"
				},
				"simple_query_string": {
					"__template": {
						"query": "",
						"fields": []
					},
					"query": "",
					"fields": ["{field}"],
					"default_operator": {
						"__one_of": ["OR", "AND"]
					},
					"analyzer": "",
					"flags": "OR|AND|PREFIX",
					"lowercase_expanded_terms": {
						"__one_of": [true, false]
					},
					"locale": "ROOT",
					"lenient": {
						"__one_of": [true, false]
					}
				},
				"range": {
					"__template": {
						"FIELD": {
							"gte": 10,
							"lte": 20
						}
					},
					"{field}": {
						"__template": {
							"gte": 10,
							"lte": 20
						},
						"gte": 10,
						"gt": 10,
						"lte": 20,
						"lt": 20,
						"time_zone": "+1:00",
						"boost": 1,
						"format": "dd/MM/yyyy||yyyy"
					}
				},
				"span_first": {
					"__template": {
						"match": {
							"span_term": {
								"FIELD": "VALUE"
							}
						},
						"end": 3
					},
					"match": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					}
				},
				"span_near": {
					"__template": {
						"clauses": [{
							"span_term": {
								"FIELD": {
									"value": "VALUE"
								}
							}
						}],
						"slop": 12,
						"in_order": false
					},
					"clauses": [{
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					}],
					"slop": 12,
					"in_order": {
						"__one_of": [false, true]
					},
					"collect_payloads": {
						"__one_of": [false, true]
					}
				},
				"span_term": {
					"__template": {
						"FIELD": {
							"value": "VALUE"
						}
					},
					"{field}": {
						"value": "",
						"boost": 2
					}
				},
				"span_not": {
					"__template": {
						"include": {
							"span_term": {
								"FIELD": {
									"value": "VALUE"
								}
							}
						},
						"exclude": {
							"span_term": {
								"FIELD": {
									"value": "VALUE"
								}
							}
						}
					},
					"include": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					},
					"exclude": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					}
				},
				"span_or": {
					"__template": {
						"clauses": [{
							"span_term": {
								"FIELD": {
									"value": "VALUE"
								}
							}
						}]
					},
					"clauses": [{
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					}]
				},
				"span_containing": {
					"__template": {
						"little": {
							"span_term": {
								"FIELD": {
									"value": "VALUE"
								}
							}
						},
						"big": {
							"span_near": {
								"clauses": [{
									"span_term": {
										"FIELD": {
											"value": "VALUE"
										}
									}
								}, {
									"span_term": {
										"FIELD": {
											"value": "VALUE"
										}
									}
								}],
								"slop": 5,
								"in_order": false
							}
						}
					},
					"little": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					},
					"big": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					}
				},
				"span_within": {
					"__template": {
						"little": {
							"span_term": {
								"FIELD": {
									"value": "VALUE"
								}
							}
						},
						"big": {
							"span_near": {
								"clauses": [{
									"span_term": {
										"FIELD": {
											"value": "VALUE"
										}
									}
								}, {
									"span_term": {
										"FIELD": {
											"value": "VALUE"
										}
									}
								}],
								"slop": 5,
								"in_order": false
							}
						}
					},
					"little": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					},
					"big": {
						"span_first": {
							"__scope_link": ".span_first"
						},
						"span_near": {
							"__scope_link": ".span_near"
						},
						"span_or": {
							"__scope_link": ".span_or"
						},
						"span_not": {
							"__scope_link": ".span_not"
						},
						"span_term": {
							"__scope_link": ".span_term"
						},
						"span_containing": {
							"__scope_link": ".span_containing"
						},
						"span_within": {
							"__scope_link": ".span_within"
						}
					}
				},
				"term": {
					"__template": {
						"FIELD": {
							"value": "VALUE"
						}
					},
					"{field}": {
						"value": "",
						"boost": 2
					}
				},
				"terms": {
					"__template": {
						"FIELD": ["VALUE1", "VALUE2"]
					},
					"{field}": [""]
				},
				"wildcard": {
					"__template": {
						"FIELD": {
							"value": "VALUE"
						}
					},
					"{field}": {
						"value": "",
						"boost": 2
					}
				},
				"nested": {
					"__template": {
						"path": "path_to_nested_doc",
						"query": {}
					},
					"path": "",
					"query": {},
					"score_mode": {
						"__one_of": ["avg", "total", "max", "none"]
					}
				},
				"custom_filters_score": {
					"__template": {
						"query": {},
						"filters": [{
							"filter": {}
						}]
					},
					"query": {},
					"filters": [{
						"filter": {},
						"boost": 2,
						"script": {}
					}],
					"score_mode": {
						"__one_of": ["first", "min", "max", "total", "avg", "multiply"]
					},
					"max_boost": 2,
					"params": {},
					"lang": ""
				},
				"indices": {
					"__template": {
						"indices": ["INDEX1", "INDEX2"],
						"query": {}
					},
					"indices": ["{index}"],
					"query": {},
					"no_match_query": {
						"__scope_link": "."
					}
				},
				"geo_shape": {
					"__template": {
						"location": {},
						"relation": "within"
					},
					"__scope_link": ".filter.geo_shape"
				},
				"function_score": {
					"__template": {
						"query": {},
						"functions": [{}]
					},
					"query": {},
					"functions": [{
						"filter": {},
						"weight": 1,
						"script_score": {
							"__template": {
								"script": "_score * doc['f'].value"
							},
							"script": {}
						},
						"boost_factor": 2,
						"random_score": {
							"seed": 314159265359
						},
						"linear": {
							"__template": {
								"FIELD": {
									"origin": "",
									"scale": ""
								}
							},
							"{field}": {
								"origin": "",
								"scale": "",
								"offset": "",
								"decay": 0.5
							}
						},
						"exp": {
							"__template": {
								"FIELD": {
									"origin": "",
									"scale": ""
								}
							},
							"{field}": {
								"origin": "",
								"scale": "",
								"offset": "",
								"decay": 0.5
							}
						},
						"gauss": {
							"__template": {
								"FIELD": {
									"origin": "",
									"scale": ""
								}
							},
							"{field}": {
								"origin": "",
								"scale": "",
								"offset": "",
								"decay": 0.5
							}
						},
						"field_value_factor": {
							"__template": {
								"field": ""
							},
							"field": "{field}",
							"factor": 1.2,
							"modifier": {
								"__one_of": ["none", "log", "log1p", "log2p", "ln", "ln1p", "ln2p", "square", "sqrt", "reciprocal"]
							}
						}
					}],
					"boost": 1,
					"boost_mode": {
						"__one_of": ["multiply", "replace", "sum", "avg", "max", "min"]
					},
					"score_mode": {
						"__one_of": ["multiply", "sum", "first", "avg", "max", "min"]
					},
					"max_boost": 10,
					"min_score": 1,
					"script_score": {
						"__template": {
							"script": "_score * doc['f'].value"
						},
						"script": {}
					},
					"boost_factor": 2,
					"random_score": {
						"seed": 314159265359
					},
					"linear": {
						"__template": {
							"FIELD": {
								"origin": "",
								"scale": ""
							}
						},
						"{field}": {
							"origin": "",
							"scale": "",
							"offset": "",
							"decay": 0.5
						}
					},
					"exp": {
						"__template": {
							"FIELD": {
								"origin": "",
								"scale": ""
							}
						},
						"{field}": {
							"origin": "",
							"scale": "",
							"offset": "",
							"decay": 0.5
						}
					},
					"gauss": {
						"__template": {
							"FIELD": {
								"origin": "",
								"scale": ""
							}
						},
						"{field}": {
							"origin": "",
							"scale": "",
							"offset": "",
							"decay": 0.5
						}
					},
					"field_value_factor": {
						"__template": {
							"field": ""
						},
						"field": "{field}",
						"factor": 1.2,
						"modifier": {
							"__one_of": ["none", "log", "log1p", "log2p", "ln", "ln1p", "ln2p", "square", "sqrt", "reciprocal"]
						}
					}
				},
				"script": {
					"__template": {
						"script": "_score * doc['f'].value"
					},
					"script": {}
				}
			}
		},
		"endpoints": {
			"_post_aliases": {
				"methods": ["POST"],
				"patterns": ["_aliases"],
				"data_autocomplete_rules": {
					"actions": {
						"__template": [{
							"add": {
								"index": "test1",
								"alias": "alias1"
							}
						}],
						"__any_of": [{
							"add": {
								"index": "{index}",
								"alias": "",
								"filter": {},
								"routing": "1",
								"search_routing": "1,2",
								"index_routing": "1"
							},
							"remove": {
								"index": "",
								"alias": ""
							}
						}]
					}
				},
				"url_params": {},
				"id": "_post_aliases"
			},
			"_get_aliases": {
				"methods": ["GET"],
				"patterns": ["_aliases"],
				"url_params": {},
				"id": "_get_aliases"
			},
			"_post_alias": {
				"methods": ["POST", "PUT"],
				"patterns": ["{indices}/_alias/{name}"],
				"data_autocomplete_rules": {
					"filter": {},
					"routing": "1",
					"search_routing": "1,2",
					"index_routing": "1"
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_post_alias"
			},
			"_delete_alias": {
				"methods": ["DELETE"],
				"patterns": ["{indices}/_alias/{name}"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_delete_alias"
			},
			"_get_alias": {
				"methods": ["GET"],
				"patterns": ["_alias", "{indices}/_alias", "{indices}/_alias/{name}", "_alias/{name}"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_get_alias"
			},
			"_cat/aliases": {
				"match": "_cat/aliases",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/aliases"],
				"id": "_cat/aliases",
				"methods": ["GET"]
			},
			"_cat/allocation": {
				"match": "_cat/allocation",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/allocation", "_cat/allocation/{nodes}"],
				"id": "_cat/allocation",
				"methods": ["GET"]
			},
			"_cat/count": {
				"match": "_cat/count",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/count"],
				"id": "_cat/count",
				"methods": ["GET"]
			},
			"_cat/health": {
				"match": "_cat/health",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"],
					"ts": ["false", "true"]
				},
				"patterns": ["_cat/health"],
				"id": "_cat/health",
				"methods": ["GET"]
			},
			"_cat/indices": {
				"match": "_cat/indices",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"],
					"h": [],
					"pri": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"patterns": ["_cat/indices", "_cat/indices/{indices}"],
				"id": "_cat/indices",
				"methods": ["GET"]
			},
			"_cat/master": {
				"match": "_cat/master",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/master"],
				"id": "_cat/master",
				"methods": ["GET"]
			},
			"_cat/nodes": {
				"match": "_cat/nodes",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/nodes"],
				"id": "_cat/nodes",
				"methods": ["GET"]
			},
			"_cat/pending_tasks": {
				"match": "_cat/pending_tasks",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/pending_tasks"],
				"id": "_cat/pending_tasks",
				"methods": ["GET"]
			},
			"_cat/recovery": {
				"match": "_cat/recovery",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/recovery"],
				"id": "_cat/recovery",
				"methods": ["GET"]
			},
			"_cat/thread_pool": {
				"match": "_cat/thread_pool",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/thread_pool"],
				"id": "_cat/thread_pool",
				"methods": ["GET"]
			},
			"_cat/shards": {
				"match": "_cat/shards",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/shards"],
				"id": "_cat/shards",
				"methods": ["GET"]
			},
			"_cat/plugins": {
				"match": "_cat/plugins",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/plugins"],
				"id": "_cat/plugins",
				"methods": ["GET"]
			},
			"_cat/segments": {
				"match": "_cat/segments",
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"bytes": ["b"]
				},
				"patterns": ["_cat/segments"],
				"id": "_cat/segments",
				"methods": ["GET"]
			},
			"_cat/nodeattrs": {
				"methods": ["GET"],
				"patterns": ["_cat/nodeattrs"],
				"url_params": {
					"help": "__flag__",
					"v": "__flag__",
					"h": ["node", "name", "id", "nodeId", "pid", "p", "host", "h", "ip", "i", "port", "po", "attr", "attr.name", "value", "attr.value"]
				},
				"id": "_cat/nodeattrs"
			},
			"_cluster/nodes/stats": {
				"id": "_cluster/nodes/stats",
				"patterns": ["_cluster/nodes/stats"],
				"methods": ["GET"]
			},
			"_cluster/state": {
				"patterns": ["_cluster/state", "_cluster/state/{metrics}", "_cluster/state/{metrics}/{indices}"],
				"url_components": {
					"metrics": ["version", "master_node", "nodes", "routing_table", "routing_node", "metadata", "blocks"]
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_cluster/state",
				"methods": ["GET"]
			},
			"_cluster/health": {
				"url_params": {
					"local": "__flag__",
					"level": ["indices", "shards"],
					"master_timeout": "30s",
					"timeout": "30s",
					"wait_for_status": ["yellow", "green"],
					"wait_for_relocating_shards": 0,
					"wait_for_active_shards": 0,
					"wait_for_nodes": 0
				},
				"id": "_cluster/health",
				"patterns": ["_cluster/health"],
				"methods": ["GET"]
			},
			"_cluster/pending_tasks": {
				"id": "_cluster/pending_tasks",
				"patterns": ["_cluster/pending_tasks"],
				"methods": ["GET"]
			},
			"get_cluster/settings": {
				"patterns": ["_cluster/settings"],
				"url_params": {},
				"id": "get_cluster/settings",
				"methods": ["GET"]
			},
			"put_cluster/settings": {
				"methods": ["PUT"],
				"patterns": ["_cluster/settings"],
				"data_autocomplete_rules": {
					"persistent": {
						"cluster": {
							"routing": {
								"allocation.enable": {
									"__one_of": ["all", "primaries", "new_primaries", "none"]
								},
								"allocation.disk.threshold_enabled": {
									"__one_of": [false, true]
								},
								"allocation.disk.watermark.low": "85%",
								"allocation.disk.watermark.high": "90%",
								"allocation.disk.include_relocations": {
									"__one_of": [true, false]
								},
								"allocation.disk.reroute_interval": "60s",
								"allocation.exclude": {
									"_ip": "",
									"_name": "",
									"_host": "",
									"_id": ""
								},
								"allocation.include": {
									"_ip": "",
									"_name": "",
									"_host": "",
									"_id": ""
								},
								"allocation.require": {
									"_ip": "",
									"_name": "",
									"_host": "",
									"_id": ""
								},
								"allocation.awareness.attributes": [],
								"allocation.awareness.force": {
									"*": {
										"values": []
									}
								},
								"allocation.allow_rebalance": {
									"__one_of": ["always", "indices_primaries_active", "indices_all_active"]
								},
								"allocation.cluster_concurrent_rebalance": 2,
								"allocation.node_initial_primaries_recoveries": 4,
								"allocation.node_concurrent_recoveries": 2,
								"allocation.same_shard.host": {
									"__one_of": [false, true]
								}
							}
						},
						"indices": {
							"breaker": {
								"total.limit": "70%",
								"fielddata.limit": "60%",
								"fielddata.overhead": 1.03,
								"request.limit": "40%",
								"request.overhead": 1
							}
						}
					},
					"transient": {
						"__scope_link": ".persistent"
					}
				},
				"url_params": {},
				"id": "put_cluster/settings"
			},
			"_cluster/reroute": {
				"methods": ["POST"],
				"url_params": {
					"explain": "__flag__",
					"dry_run": "__flag__"
				},
				"data_autocomplete_rules": {
					"commands": [{
						"move": {
							"__template": {
								"index": "",
								"shard": 0,
								"from_node": "",
								"to_node": ""
							},
							"index": "{index}",
							"shard": 0,
							"from_node": "{node}",
							"to_node": "{node}"
						},
						"cancel": {
							"__template": {
								"index": "",
								"shard": 0,
								"node": ""
							},
							"index": "{index}",
							"shard": 0,
							"node": "{node}",
							"allow_primary": {
								"__one_of": [true, false]
							}
						},
						"allocate": {
							"__template": {
								"index": "",
								"shard": 0,
								"node": ""
							},
							"index": "{index}",
							"shard": 0,
							"node": "{node}",
							"allow_primary": {
								"__one_of": [true, false]
							}
						}
					}],
					"dry_run": {
						"__one_of": [true, false]
					}
				},
				"id": "_cluster/reroute",
				"patterns": ["_cluster/reroute"]
			},
			"_count": {
				"methods": ["GET", "POST"],
				"priority": 10,
				"patterns": ["{indices}/{types}/_count", "{indices}/_count", "_count"],
				"url_params": {
					"preference": ["_primary", "_primary_first", "_local", "_only_node:xyz", "_prefer_node:xyz", "_shards:2,3"],
					"routing": "",
					"min_score": 1,
					"terminate_after": 10,
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"query": {}
				},
				"id": "_count"
			},
			"_get_doc": {
				"methods": ["GET"],
				"patterns": ["{index}/{type}/{id}"],
				"url_params": {
					"version": 1,
					"routing": "",
					"parent": "",
					"_source": "",
					"_source_exclude": "",
					"_source_include": ""
				},
				"id": "_get_doc"
			},
			"_get_doc_source": {
				"methods": ["GET"],
				"patterns": ["{index}/{type}/{id}/_source"],
				"url_params": {
					"version": 1,
					"routing": "",
					"parent": "",
					"_source_exclude": "",
					"_source_include": ""
				},
				"id": "_get_doc_source"
			},
			"_delete_doc": {
				"methods": ["DELETE"],
				"patterns": ["{index}/{type}/{id}"],
				"url_params": {
					"version": 1,
					"version_type": ["external", "internal"],
					"routing": "",
					"parent": ""
				},
				"id": "_delete_doc"
			},
			"index_doc": {
				"methods": ["PUT", "POST"],
				"patterns": ["{index}/{type}/{id}"],
				"url_params": {
					"version": 1,
					"version_type": ["external", "internal"],
					"op_type": ["create"],
					"routing": "",
					"parent": "",
					"timestamp": "",
					"ttl": "5m",
					"consistency": ["qurom", "one", "all"],
					"refresh": "__flag__",
					"timeout": "1m"
				},
				"id": "index_doc"
			},
			"create_doc": {
				"methods": ["PUT", "POST"],
				"patterns": ["{index}/{type}/{id}/_create"],
				"url_params": {
					"version": 1,
					"version_type": ["external", "internal"],
					"routing": "",
					"parent": "",
					"timestamp": "",
					"ttl": "5m",
					"consistency": ["qurom", "one", "all"],
					"refresh": "__flag__",
					"timeout": "1m"
				},
				"id": "create_doc"
			},
			"index_doc_no_id": {
				"methods": ["POST"],
				"patterns": ["{index}/{type}"],
				"url_params": {
					"version": 1,
					"version_type": ["external", "internal"],
					"routing": "",
					"parent": "",
					"timestamp": "",
					"ttl": "5m",
					"consistency": ["qurom", "one", "all"],
					"refresh": "__flag__",
					"timeout": "1m"
				},
				"id": "index_doc_no_id"
			},
			"_update": {
				"methods": ["POST"],
				"patterns": ["{index}/{type}/{id}/_update"],
				"url_params": {
					"version": 1,
					"version_type": ["force", "internal"],
					"routing": "",
					"parent": "",
					"timestamp": "",
					"consistency": ["qurom", "one", "all"],
					"refresh": "__flag__",
					"timeout": "1m",
					"retry_on_conflict": 3,
					"fields": ""
				},
				"data_autocomplete_rules": {
					"script": {},
					"doc": {},
					"upsert": {},
					"scripted_upsert": {
						"__one_of": [true, false]
					}
				},
				"id": "_update"
			},
			"_put_script": {
				"methods": ["POST", "PUT"],
				"patterns": ["_scripts/{lang}/{id}", "_scripts/{lang}/{id}/_create"],
				"url_components": {
					"lang": ["groovy", "expressions"]
				},
				"data_autocomplete_rules": {
					"script": ""
				},
				"url_params": {},
				"id": "_put_script"
			},
			"_termvectors": {
				"methods": ["GET", "POST"],
				"patterns": ["{index}/{type}/_termvectors"],
				"priority": 10,
				"url_params": {
					"fields": "",
					"offsets": "__flag__",
					"payloads": "__flag__",
					"positions": "__flag__",
					"term_statistics": "__flag__",
					"field_statistics": "__flag__",
					"routing": "",
					"version": 1,
					"version_type": ["external", "external_gt", "external_gte", "force", "internal"],
					"parent": "",
					"preference": ""
				},
				"data_autocomplete_rules": {
					"fields": ["{field}"],
					"offsets": {
						"__one_of": [false, true]
					},
					"payloads": {
						"__one_of": [false, true]
					},
					"positions": {
						"__one_of": [false, true]
					},
					"term_statistics": {
						"__one_of": [true, false]
					},
					"field_statistics": {
						"__one_of": [false, true]
					},
					"per_field_analyzer": {
						"__template": {
							"FIELD": ""
						},
						"{field}": ""
					},
					"routing": "",
					"version": 1,
					"version_type": ["external", "external_gt", "external_gte", "force", "internal"],
					"doc": {},
					"filter": {
						"max_num_terms": 1,
						"min_term_freq": 1,
						"max_term_freq": 1,
						"min_doc_freq": 1,
						"max_doc_freq": 1,
						"min_word_length": 1,
						"max_word_length": 1
					}
				},
				"id": "_termvectors"
			},
			"_termvectors_id": {
				"methods": ["GET", "POST"],
				"patterns": ["{index}/{type}/{id}/_termvectors"],
				"url_params": {
					"fields": "",
					"offsets": "__flag__",
					"payloads": "__flag__",
					"positions": "__flag__",
					"term_statistics": "__flag__",
					"field_statistics": "__flag__",
					"routing": "",
					"version": 1,
					"version_type": ["external", "external_gt", "external_gte", "force", "internal"],
					"parent": "",
					"preference": "",
					"dfs": "__flag__"
				},
				"data_autocomplete_rules": {
					"fields": ["{field}"],
					"offsets": {
						"__one_of": [false, true]
					},
					"payloads": {
						"__one_of": [false, true]
					},
					"positions": {
						"__one_of": [false, true]
					},
					"term_statistics": {
						"__one_of": [true, false]
					},
					"field_statistics": {
						"__one_of": [false, true]
					},
					"dfs": {
						"__one_of": [true, false]
					},
					"per_field_analyzer": {
						"__template": {
							"FIELD": ""
						},
						"{field}": ""
					},
					"routing": "",
					"version": 1,
					"version_type": ["external", "external_gt", "external_gte", "force", "internal"],
					"filter": {
						"max_num_terms": 1,
						"min_term_freq": 1,
						"max_term_freq": 1,
						"min_doc_freq": 1,
						"max_doc_freq": 1,
						"min_word_length": 1,
						"max_word_length": 1
					}
				},
				"id": "_termvectors_id"
			},
			"_field_stats": {
				"methods": ["GET", "POST"],
				"patterns": ["_field_stats", "{indices}/_field_stats"],
				"url_params": {
					"fields": [],
					"level": ["cluster", "indices"],
					"ignore_unavailable": ["true", "false"],
					"allow_no_indices": [false, true],
					"expand_wildcards": ["open", "closed", "none", "all"]
				},
				"data_autocomplete_rules": {
					"fields": ["{field}"],
					"index_constraints": {
						"{field}": {
							"min_value": {
								"gt": "MIN",
								"gte": "MAX",
								"lt": "MIN",
								"lte": "MAX"
							},
							"max_value": {
								"gt": "MIN",
								"gte": "MAX",
								"lt": "MIN",
								"lte": "MAX"
							}
						},
						"__template": {
							"FIELD": {
								"min_value": {
									"gt": "MIN"
								},
								"max_value": {
									"lt": "MAX"
								}
							}
						}
					}
				},
				"id": "_field_stats"
			},
			"_nodes/hot_threads": {
				"methods": ["GET"],
				"patterns": ["_nodes/hot_threads", "_nodes/{nodes}/hot_threads"],
				"url_params": {},
				"id": "_nodes/hot_threads"
			},
			"_nodes/info": {
				"patterns": ["_nodes", "_nodes/{metrics}", "_nodes/{nodes}", "_nodes/{nodes}/{metrics}", "_nodes/{nodes}/info/{metrics}"],
				"url_components": {
					"metrics": ["settings", "os", "process", "jvm", "thread_pool", "network", "transport", "http", "plugins", "ingest", "_all"]
				},
				"url_params": {},
				"id": "_nodes/info",
				"methods": ["GET"]
			},
			"_nodes/stats": {
				"patterns": ["_nodes/stats", "_nodes/stats/{metrics}", "_nodes/stats/{metrics}/{index_metric}", "_nodes/{nodes}/stats", "_nodes/{nodes}/stats/{metrics}", "_nodes/{nodes}/stats/{metrics}/{index_metric}"],
				"url_components": {
					"metrics": ["os", "jvm", "thread_pool", "network", "fs", "transport", "http", "indices", "process", "breaker", "ingest", "_all"],
					"index_metric": ["store", "indexing", "get", "search", "merge", "flush", "refresh", "filter_cache", "fielddata", "docs", "warmer", "percolate", "completion", "segments", "translog", "query_cache", "_all"]
				},
				"url_params": {},
				"id": "_nodes/stats",
				"methods": ["GET"]
			},
			"_refresh": {
				"methods": ["POST"],
				"patterns": ["_refresh", "{indices}/_refresh"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_refresh"
			},
			"_flush": {
				"methods": ["POST"],
				"patterns": ["_flush", "{indices}/_flush"],
				"url_params": {
					"wait_if_ongoing": [true, false],
					"force": [true, false],
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_flush"
			},
			"_flush_synced": {
				"methods": ["POST"],
				"patterns": ["_flush/synced", "{indices}/_flush/synced"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_flush_synced"
			},
			"_stats": {
				"patterns": ["_stats", "_stats/{metrics}", "{indices}/_stats", "{indices}/_stats/{metrics}"],
				"url_components": {
					"metrics": ["docs", "store", "indexing", "search", "get", "merge", "refresh", "flush", "warmer", "filter_cache", "percolate", "segments", "fielddata", "completion", "translog", "query_cache", "commit", "_all"]
				},
				"url_params": {
					"fields": [],
					"types": [],
					"completion_fields": [],
					"docvalue_fields": [],
					"level": ["cluster", "indices", "shards"],
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_stats",
				"methods": ["GET"]
			},
			"_segments": {
				"patterns": ["{indices}/_segments", "_segments"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_segments",
				"methods": ["GET"]
			},
			"_recovery": {
				"patterns": ["{indices}/_recovery", "_recovery"],
				"url_params": {
					"detailed": "__flag__",
					"active_only": "__flag__",
					"human": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_recovery",
				"methods": ["GET"]
			},
			"_analyze": {
				"methods": ["GET", "POST"],
				"patterns": ["{indices}/_analyze", "_analyze"],
				"url_params": {
					"analyzer": "",
					"char_filter": [],
					"field": "",
					"filter": [],
					"text": "",
					"tokenizer": "",
					"explain": "__flag__",
					"attributes": [],
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"text": [],
					"field": "{field}",
					"analyzer": "",
					"tokenizer": "",
					"char_filter": [],
					"filter": [],
					"explain": {
						"__one_of": [false, true]
					},
					"attributes": []
				},
				"id": "_analyze"
			},
			"_validate_query": {
				"methods": ["GET", "POST"],
				"patterns": ["{indices}/_validate/query", "_validate/query"],
				"url_params": {
					"explain": "__flag__",
					"rewrite": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"query": {}
				},
				"id": "_validate_query"
			},
			"_shard_stores": {
				"methods": ["GET"],
				"patterns": ["{indices}/_shard_stores", "_shard_stores"],
				"url_params": {
					"status": ["green", "yellow", "red", "all"],
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_shard_stores"
			},
			"__create_index__": {
				"methods": ["PUT"],
				"patterns": ["{index}"],
				"data_autocomplete_rules": {
					"mappings": {
						"__scope_link": "_put_mapping"
					},
					"settings": {
						"__scope_link": "_put_settings"
					},
					"aliases": {
						"__template": {
							"NAME": {}
						}
					}
				},
				"url_params": {},
				"id": "__create_index__"
			},
			"__delete_indices__": {
				"methods": ["DELETE"],
				"patterns": ["{indices}"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "__delete_indices__"
			},
			"_get_index_settings": {
				"methods": ["GET"],
				"patterns": ["{indices}/_settings"],
				"url_params": {
					"flat_settings": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_get_index_settings"
			},
			"_get_index": {
				"methods": ["GET"],
				"patterns": ["{indices}", "{indices}/{feature}"],
				"url_components": {
					"feature": ["_mappings", "_aliases"]
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_get_index"
			},
			"_cache/clear": {
				"patterns": ["_cache/clear", "{indices}/_cache/clear"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_cache/clear",
				"methods": ["GET"]
			},
			"_upgrade": {
				"methods": ["POST"],
				"patterns": ["_upgrade", "{indices}/_upgrade"],
				"url_params": {
					"wait_for_completion": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_upgrade"
			},
			"_upgrade_status": {
				"methods": ["GET"],
				"patterns": ["_upgrade", "{indices}/_upgrade"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_upgrade_status"
			},
			"_close": {
				"methods": ["POST"],
				"patterns": ["{indices}/_close"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_close"
			},
			"_open": {
				"methods": ["POST"],
				"patterns": ["{indices}/_open"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_open"
			},
			"_processor": {
				"data_autocomplete_rules": {
					"__one_of": [{
						"append": {
							"__template": {
								"field": "",
								"value": []
							},
							"field": "",
							"value": []
						}
					}, {
						"convert": {
							"__template": {
								"field": "",
								"type": ""
							},
							"field": "",
							"type": {
								"__one_of": ["integer", "float", "string", "boolean", "auto"]
							},
							"target_field": "",
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"date": {
							"__template": {
								"field": "",
								"formats": []
							},
							"field": "",
							"target_field": "@timestamp",
							"formats": [],
							"timezone": "UTC",
							"locale": "ENGLISH"
						}
					}, {
						"date_index_name": {
							"__template": {
								"field": "",
								"date_rounding": ""
							},
							"field": "",
							"date_rounding": {
								"__one_of": ["y", "M", "w", "d", "h", "m", "s"]
							},
							"date_formats": [],
							"timezone": "UTC",
							"locale": "ENGLISH",
							"index_name_format": "yyyy-MM-dd"
						}
					}, {
						"fail": {
							"__template": {
								"message": ""
							},
							"message": ""
						}
					}, {
						"foreach": {
							"__template": {
								"field": "",
								"processor": {}
							},
							"field": "",
							"processor": {
								"__scope_link": "_processor"
							}
						}
					}, {
						"grok": {
							"__template": {
								"field": "",
								"patterns": []
							},
							"field": "",
							"patterns": [],
							"pattern_definitions": {},
							"trace_match": {
								"__one_of": [false, true]
							},
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"gsub": {
							"__template": {
								"field": "",
								"pattern": "",
								"replacement": ""
							},
							"field": "",
							"pattern": "",
							"replacement": ""
						}
					}, {
						"join": {
							"__template": {
								"field": "",
								"separator": ""
							},
							"field": "",
							"separator": ""
						}
					}, {
						"json": {
							"__template": {
								"field": ""
							},
							"field": "",
							"target_field": "",
							"add_to_root": {
								"__one_of": [false, true]
							}
						}
					}, {
						"kv": {
							"__template": {
								"field": "",
								"field_split": "",
								"value_split": ""
							},
							"field": "",
							"field_split": "",
							"value_split": "",
							"target_field": "",
							"include_keys": [],
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"lowercase": {
							"__template": {
								"field": ""
							},
							"field": "",
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"remove": {
							"__template": {
								"field": ""
							},
							"field": ""
						}
					}, {
						"rename": {
							"__template": {
								"field": "",
								"target_field": ""
							},
							"field": "",
							"target_field": "",
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"script": {
							"__template": {},
							"lang": "painless",
							"file": "",
							"id": "",
							"inline": "",
							"params": {}
						}
					}, {
						"set": {
							"__template": {
								"field": "",
								"value": ""
							},
							"field": "",
							"value": "",
							"override": {
								"__one_of": [true, false]
							}
						}
					}, {
						"split": {
							"__template": {
								"field": "",
								"separator": ""
							},
							"field": "",
							"separator": "",
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"sort": {
							"__template": {
								"field": ""
							},
							"field": "",
							"order": "asc"
						}
					}, {
						"trim": {
							"__template": {
								"field": ""
							},
							"field": "",
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"uppercase": {
							"__template": {
								"field": ""
							},
							"field": "",
							"ignore_missing": {
								"__one_of": [false, true]
							}
						}
					}, {
						"dot_expander": {
							"__template": {
								"field": ""
							},
							"field": "",
							"path": ""
						}
					}]
				},
				"url_params": {},
				"id": "_processor",
				"patterns": ["_processor"],
				"methods": ["GET"]
			},
			"_put_ingest_pipeline": {
				"methods": ["PUT"],
				"patterns": ["_ingest/pipeline/{name}"],
				"data_autocomplete_rules": {
					"description": "",
					"processors": [{
						"__one_of": [{
							"append": {
								"__template": {
									"field": "",
									"value": []
								},
								"field": "",
								"value": []
							}
						}, {
							"convert": {
								"__template": {
									"field": "",
									"type": ""
								},
								"field": "",
								"type": {
									"__one_of": ["integer", "float", "string", "boolean", "auto"]
								},
								"target_field": "",
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"date": {
								"__template": {
									"field": "",
									"formats": []
								},
								"field": "",
								"target_field": "@timestamp",
								"formats": [],
								"timezone": "UTC",
								"locale": "ENGLISH"
							}
						}, {
							"date_index_name": {
								"__template": {
									"field": "",
									"date_rounding": ""
								},
								"field": "",
								"date_rounding": {
									"__one_of": ["y", "M", "w", "d", "h", "m", "s"]
								},
								"date_formats": [],
								"timezone": "UTC",
								"locale": "ENGLISH",
								"index_name_format": "yyyy-MM-dd"
							}
						}, {
							"fail": {
								"__template": {
									"message": ""
								},
								"message": ""
							}
						}, {
							"foreach": {
								"__template": {
									"field": "",
									"processor": {}
								},
								"field": "",
								"processor": {
									"__scope_link": "_processor"
								}
							}
						}, {
							"grok": {
								"__template": {
									"field": "",
									"patterns": []
								},
								"field": "",
								"patterns": [],
								"pattern_definitions": {},
								"trace_match": {
									"__one_of": [false, true]
								},
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"gsub": {
								"__template": {
									"field": "",
									"pattern": "",
									"replacement": ""
								},
								"field": "",
								"pattern": "",
								"replacement": ""
							}
						}, {
							"join": {
								"__template": {
									"field": "",
									"separator": ""
								},
								"field": "",
								"separator": ""
							}
						}, {
							"json": {
								"__template": {
									"field": ""
								},
								"field": "",
								"target_field": "",
								"add_to_root": {
									"__one_of": [false, true]
								}
							}
						}, {
							"kv": {
								"__template": {
									"field": "",
									"field_split": "",
									"value_split": ""
								},
								"field": "",
								"field_split": "",
								"value_split": "",
								"target_field": "",
								"include_keys": [],
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"lowercase": {
								"__template": {
									"field": ""
								},
								"field": "",
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"remove": {
								"__template": {
									"field": ""
								},
								"field": ""
							}
						}, {
							"rename": {
								"__template": {
									"field": "",
									"target_field": ""
								},
								"field": "",
								"target_field": "",
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"script": {
								"__template": {},
								"lang": "painless",
								"file": "",
								"id": "",
								"inline": "",
								"params": {}
							}
						}, {
							"set": {
								"__template": {
									"field": "",
									"value": ""
								},
								"field": "",
								"value": "",
								"override": {
									"__one_of": [true, false]
								}
							}
						}, {
							"split": {
								"__template": {
									"field": "",
									"separator": ""
								},
								"field": "",
								"separator": "",
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"sort": {
								"__template": {
									"field": ""
								},
								"field": "",
								"order": "asc"
							}
						}, {
							"trim": {
								"__template": {
									"field": ""
								},
								"field": "",
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"uppercase": {
								"__template": {
									"field": ""
								},
								"field": "",
								"ignore_missing": {
									"__one_of": [false, true]
								}
							}
						}, {
							"dot_expander": {
								"__template": {
									"field": ""
								},
								"field": "",
								"path": ""
							}
						}]
					}],
					"version": 123
				},
				"url_params": {},
				"id": "_put_ingest_pipeline"
			},
			"_get_ingest_pipeline": {
				"methods": ["GET"],
				"patterns": ["_ingest/pipeline/{id}"],
				"url_params": {},
				"id": "_get_ingest_pipeline"
			},
			"_delete_ingest_pipeline": {
				"methods": ["DELETE"],
				"patterns": ["_ingest/pipeline/{id}"],
				"url_params": {},
				"id": "_delete_ingest_pipeline"
			},
			"_simulate_new_ingest_pipeline": {
				"methods": ["POST"],
				"patterns": ["_ingest/pipeline/_simulate"],
				"url_params": {
					"verbose": "__flag__"
				},
				"data_autocomplete_rules": {
					"pipeline": {
						"description": "",
						"processors": [{
							"__one_of": [{
								"append": {
									"__template": {
										"field": "",
										"value": []
									},
									"field": "",
									"value": []
								}
							}, {
								"convert": {
									"__template": {
										"field": "",
										"type": ""
									},
									"field": "",
									"type": {
										"__one_of": ["integer", "float", "string", "boolean", "auto"]
									},
									"target_field": "",
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"date": {
									"__template": {
										"field": "",
										"formats": []
									},
									"field": "",
									"target_field": "@timestamp",
									"formats": [],
									"timezone": "UTC",
									"locale": "ENGLISH"
								}
							}, {
								"date_index_name": {
									"__template": {
										"field": "",
										"date_rounding": ""
									},
									"field": "",
									"date_rounding": {
										"__one_of": ["y", "M", "w", "d", "h", "m", "s"]
									},
									"date_formats": [],
									"timezone": "UTC",
									"locale": "ENGLISH",
									"index_name_format": "yyyy-MM-dd"
								}
							}, {
								"fail": {
									"__template": {
										"message": ""
									},
									"message": ""
								}
							}, {
								"foreach": {
									"__template": {
										"field": "",
										"processor": {}
									},
									"field": "",
									"processor": {
										"__scope_link": "_processor"
									}
								}
							}, {
								"grok": {
									"__template": {
										"field": "",
										"patterns": []
									},
									"field": "",
									"patterns": [],
									"pattern_definitions": {},
									"trace_match": {
										"__one_of": [false, true]
									},
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"gsub": {
									"__template": {
										"field": "",
										"pattern": "",
										"replacement": ""
									},
									"field": "",
									"pattern": "",
									"replacement": ""
								}
							}, {
								"join": {
									"__template": {
										"field": "",
										"separator": ""
									},
									"field": "",
									"separator": ""
								}
							}, {
								"json": {
									"__template": {
										"field": ""
									},
									"field": "",
									"target_field": "",
									"add_to_root": {
										"__one_of": [false, true]
									}
								}
							}, {
								"kv": {
									"__template": {
										"field": "",
										"field_split": "",
										"value_split": ""
									},
									"field": "",
									"field_split": "",
									"value_split": "",
									"target_field": "",
									"include_keys": [],
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"lowercase": {
									"__template": {
										"field": ""
									},
									"field": "",
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"remove": {
									"__template": {
										"field": ""
									},
									"field": ""
								}
							}, {
								"rename": {
									"__template": {
										"field": "",
										"target_field": ""
									},
									"field": "",
									"target_field": "",
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"script": {
									"__template": {},
									"lang": "painless",
									"file": "",
									"id": "",
									"inline": "",
									"params": {}
								}
							}, {
								"set": {
									"__template": {
										"field": "",
										"value": ""
									},
									"field": "",
									"value": "",
									"override": {
										"__one_of": [true, false]
									}
								}
							}, {
								"split": {
									"__template": {
										"field": "",
										"separator": ""
									},
									"field": "",
									"separator": "",
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"sort": {
									"__template": {
										"field": ""
									},
									"field": "",
									"order": "asc"
								}
							}, {
								"trim": {
									"__template": {
										"field": ""
									},
									"field": "",
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"uppercase": {
									"__template": {
										"field": ""
									},
									"field": "",
									"ignore_missing": {
										"__one_of": [false, true]
									}
								}
							}, {
								"dot_expander": {
									"__template": {
										"field": ""
									},
									"field": "",
									"path": ""
								}
							}]
						}],
						"version": 123
					},
					"docs": []
				},
				"id": "_simulate_new_ingest_pipeline"
			},
			"_simulate_existing_ingest_pipeline": {
				"methods": ["POST"],
				"patterns": ["_ingest/pipeline/{name}/_simulate"],
				"url_params": {
					"verbose": "__flag__"
				},
				"data_autocomplete_rules": {
					"docs": []
				},
				"id": "_simulate_existing_ingest_pipeline"
			},
			"_get_mapping": {
				"methods": ["GET"],
				"priority": 10,
				"patterns": ["{indices}/_mapping", "{indices}/_mapping/{types}", "{indices}/{types}/_mapping", "_mapping"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_get_mapping"
			},
			"_get_field_mapping": {
				"methods": ["GET"],
				"priority": 10,
				"patterns": ["{indices}/_mapping/field/{fields}", "{indices}/_mapping/{type}/field/{fields}"],
				"url_params": {
					"include_defaults": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_get_field_mapping"
			},
			"_delete_mapping": {
				"methods": ["DELETE"],
				"priority": 10,
				"patterns": ["{indices}/_mapping", "{indices}/_mapping/{types}", "{indices}/{types}/_mapping", "_mapping"],
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_delete_mapping"
			},
			"_put_type_mapping": {
				"methods": ["PUT", "POST"],
				"patterns": ["{indices}/{type}/_mapping", "{indices}/_mapping/{type}"],
				"priority": 10,
				"data_autocomplete_rules": {
					"__template": {
						"properties": {
							"FIELD": {}
						}
					},
					"_source": {
						"enabled": {
							"__one_of": [true, false]
						}
					},
					"_all": {
						"enabled": {
							"__one_of": [true, false]
						}
					},
					"_field_names": {
						"index": {
							"__one_of": [true, false]
						}
					},
					"_routing": {
						"required": {
							"__one_of": [true, false]
						}
					},
					"_index": {
						"enabled": {
							"__one_of": [true, false]
						}
					},
					"_parent": {
						"__template": {
							"type": ""
						},
						"type": "{type}"
					},
					"_timestamp": {
						"enabled": {
							"__one_of": [true, false]
						},
						"format": "YYYY-MM-dd",
						"default": ""
					},
					"dynamic_date_formats": ["yyyy-MM-dd"],
					"date_detection": {
						"__one_of": [true, false]
					},
					"numeric_detection": {
						"__one_of": [true, false]
					},
					"properties": {
						"*": {
							"type": {
								"__one_of": ["text", "keyword", "float", "half_float", "scaled_float", "double", "byte", "short", "integer", "long", "date", "boolean", "binary", "object", "nested", "geo_point", "geo_shape"]
							},
							"store": {
								"__one_of": [true, false]
							},
							"index": {
								"__one_of": [true, false]
							},
							"term_vector": {
								"__one_of": ["no", "yes", "with_offsets", "with_positions", "with_positions_offsets"]
							},
							"boost": 1,
							"null_value": "",
							"norms": {
								"__one_of": [true, false]
							},
							"index_options": {
								"__one_of": ["docs", "freqs", "positions"]
							},
							"analyzer": "standard",
							"search_analyzer": "standard",
							"include_in_all": {
								"__one_of": [false, true]
							},
							"ignore_above": 10,
							"position_increment_gap": 0,
							"precision_step": 4,
							"ignore_malformed": {
								"__one_of": [true, false]
							},
							"scaling_factor": 100,
							"lat_lon": {
								"__one_of": [true, false]
							},
							"geohash": {
								"__one_of": [true, false]
							},
							"geohash_precision": "1m",
							"geohash_prefix": {
								"__one_of": [true, false]
							},
							"validate": {
								"__one_of": [true, false]
							},
							"validate_lat": {
								"__one_of": [true, false]
							},
							"validate_lon": {
								"__one_of": [true, false]
							},
							"normalize": {
								"__one_of": [true, false]
							},
							"normalize_lat": {
								"__one_of": [true, false]
							},
							"normalize_lon": {
								"__one_of": [true, false]
							},
							"tree": {
								"__one_of": ["geohash", "quadtree"]
							},
							"precision": "5km",
							"tree_levels": 12,
							"distance_error_pct": 0.025,
							"orientation": "ccw",
							"format": {
								"__one_of": [
									["basic_date", "strict_date"],
									["basic_date_time", "strict_date_time"],
									["basic_date_time_no_millis", "strict_date_time_no_millis"],
									["basic_ordinal_date", "strict_ordinal_date"],
									["basic_ordinal_date_time", "strict_ordinal_date_time"],
									["basic_ordinal_date_time_no_millis", "strict_ordinal_date_time_no_millis"],
									["basic_time", "strict_time"],
									["basic_time_no_millis", "strict_time_no_millis"],
									["basic_t_time", "strict_t_time"],
									["basic_t_time_no_millis", "strict_t_time_no_millis"],
									["basic_week_date", "strict_week_date"],
									["basic_week_date_time", "strict_week_date_time"],
									["basic_week_date_time_no_millis", "strict_week_date_time_no_millis"], "date", "date_hour", "date_hour_minute", "date_hour_minute_second", "date_hour_minute_second_fraction", "date_hour_minute_second_millis", "date_optional_time", "date_time", "date_time_no_millis", "hour", "hour_minute", "hour_minute_second", "hour_minute_second_fraction", "hour_minute_second_millis", "ordinal_date", "ordinal_date_time", "ordinal_date_time_no_millis", "time", "time_no_millis", "t_time", "t_time_no_millis", "week_date", "week_date_time", "weekDateTimeNoMillis", "week_year", "weekyearWeek", "weekyearWeekDay", "year", "year_month", "year_month_day", "epoch_millis", "epoch_second"
								]
							},
							"fielddata": {
								"filter": {
									"regex": "",
									"frequency": {
										"min": 0.001,
										"max": 0.1,
										"min_segment_size": 500
									}
								}
							},
							"similarity": {
								"__one_of": ["default", "BM25"]
							},
							"properties": {
								"__scope_link": "_put_mapping.{type}.properties"
							},
							"fields": {
								"*": {
									"__scope_link": "_put_mapping.type.properties.field"
								}
							},
							"copy_to": {
								"__one_of": ["{field}", ["{field}"]]
							},
							"include_in_parent": {
								"__one_of": [true, false]
							},
							"include_in_root": {
								"__one_of": [true, false]
							}
						}
					}
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_put_type_mapping"
			},
			"_put_mapping": {
				"methods": ["PUT"],
				"patterns": ["{indices}/_mapping"],
				"data_autocomplete_rules": {
					"{type}": {
						"__scope_link": "_put_type_mapping"
					}
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_put_mapping"
			},
			"_put_percolator": {
				"priority": 10,
				"methods": ["PUT", "POST"],
				"patterns": ["{index}/.percolator/{id}"],
				"url_params": {
					"version": 1,
					"version_type": ["external", "internal"],
					"op_type": ["create"],
					"routing": "",
					"parent": "",
					"timestamp": "",
					"ttl": "5m",
					"consistency": ["qurom", "one", "all"],
					"refresh": "__flag__",
					"timeout": "1m"
				},
				"data_autocomplete_rules": {
					"query": {}
				},
				"id": "_put_percolator"
			},
			"_percolate": {
				"methods": ["GET", "POST"],
				"priority": 10,
				"patterns": ["{indices}/{type}/_percolate"],
				"url_params": {
					"preference": ["_primary", "_primary_first", "_local", "_only_node:xyz", "_prefer_node:xyz", "_shards:2,3"],
					"routing": "",
					"ignore_unavailable": ["true", "false"],
					"percolate_format": ["ids"],
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"doc": {},
					"query": {},
					"filter": {},
					"size": 10,
					"track_scores": {
						"__one_of": [true, false]
					},
					"sort": "_score",
					"aggs": {},
					"highlight": {}
				},
				"id": "_percolate"
			},
			"_percolate_id": {
				"methods": ["GET", "POST"],
				"patterns": ["{indices}/{type}/{id}/_percolate"],
				"url_params": {
					"routing": "",
					"ignore_unavailable": ["true", "false"],
					"percolate_format": ["ids"],
					"percolate_index": "{index}",
					"percolate_type": "{type}",
					"percolate_routing": "",
					"percolate_preference": ["_primary", "_primary_first", "_local", "_only_node:xyz", "_prefer_node:xyz", "_shards:2,3"],
					"version": 1,
					"version_type": ["external", "internal"],
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"query": {},
					"filter": {},
					"size": 10,
					"track_scores": {
						"__one_of": [true, false]
					},
					"sort": "_score",
					"aggs": {},
					"highlight": {}
				},
				"id": "_percolate_id"
			},
			"_percolate_count": {
				"methods": ["GET", "POST"],
				"patterns": ["{indices}/{type}/_percolate/count"],
				"url_params": {
					"preference": ["_primary", "_primary_first", "_local", "_only_node:xyz", "_prefer_node:xyz", "_shards:2,3"],
					"routing": "",
					"ignore_unavailable": ["true", "false"],
					"percolate_format": ["ids"],
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"doc": {},
					"query": {},
					"filter": {}
				},
				"id": "_percolate_count"
			},
			"_post_reindex": {
				"methods": ["POST"],
				"patterns": ["_reindex"],
				"url_params": {
					"refresh": "__flag__",
					"wait_for_completion": "true",
					"wait_for_active_shards": 1,
					"timeout": "1m",
					"requests_per_second": 0,
					"slices": 1
				},
				"data_autocomplete_rules": {
					"__template": {
						"source": {},
						"dest": {}
					},
					"source": {
						"index": "",
						"type": "",
						"query": {
							"__scope_link": "GLOBAL.query"
						},
						"sort": {
							"__template": {
								"FIELD": "desc"
							},
							"FIELD": {
								"__one_of": ["asc", "desc"]
							}
						},
						"size": 1000,
						"remote": {
							"__template": {
								"host": ""
							},
							"host": "",
							"username": "",
							"password": "",
							"socket_timeout": "30s",
							"connect_timeout": "30s"
						}
					},
					"dest": {
						"index": "",
						"version_type": {
							"__one_of": ["internal", "external"]
						},
						"op_type": "create",
						"routing": {
							"__one_of": ["keep", "discard", "=SOME TEXT"]
						},
						"pipeline": ""
					},
					"conflicts": "proceed",
					"size": 10,
					"script": {
						"__scope_link": "GLOBAL.script"
					}
				},
				"id": "_post_reindex"
			},
			"restore_snapshot": {
				"methods": ["POST"],
				"patterns": ["_snapshot/{id}/{id}/_restore"],
				"url_params": {
					"wait_for_completion": "__flag__"
				},
				"data_autocomplete_rules": {
					"indices": "*",
					"ignore_unavailable": {
						"__one_of": [true, false]
					},
					"include_global_state": false,
					"rename_pattern": "index_(.+)",
					"rename_replacement": "restored_index_$1"
				},
				"id": "restore_snapshot"
			},
			"single_snapshot": {
				"methods": ["GET", "DELETE"],
				"patterns": ["_snapshot/{id}/{id}"],
				"url_params": {},
				"id": "single_snapshot"
			},
			"all_snapshots": {
				"methods": ["GET"],
				"patterns": ["_snapshot/{id}/_all"],
				"url_params": {},
				"id": "all_snapshots"
			},
			"put_snapshot": {
				"methods": ["PUT"],
				"patterns": ["_snapshot/{id}/{id}"],
				"url_params": {
					"wait_for_completion": "__flag__"
				},
				"data_autocomplete_rules": {
					"indices": "*",
					"ignore_unavailable": {
						"__one_of": [true, false]
					},
					"include_global_state": {
						"__one_of": [true, false]
					},
					"partial": {
						"__one_of": [true, false]
					}
				},
				"id": "put_snapshot"
			},
			"_snapshot_status": {
				"methods": ["GET"],
				"patterns": ["_snapshot/_status", "_snapshot/{id}/_status", "_snapshot/{id}/{ids}/_status"],
				"url_params": {},
				"id": "_snapshot_status"
			},
			"put_repository": {
				"methods": ["PUT"],
				"patterns": ["_snapshot/{id}"],
				"data_autocomplete_rules": {
					"__template": {
						"type": ""
					},
					"type": {
						"__one_of": ["fs", "url", "s3", "hdfs"]
					},
					"settings": {
						"__one_of": [{
							"__condition": {
								"lines_regex": "type[\"']\\s*:\\s*[\"']fs"
							},
							"__template": {
								"location": "path"
							},
							"location": "path",
							"compress": {
								"__one_of": [true, false]
							},
							"concurrent_streams": 5,
							"chunk_size": "10m",
							"max_restore_bytes_per_sec": "20mb",
							"max_snapshot_bytes_per_sec": "20mb"
						}, {
							"__condition": {
								"lines_regex": "type[\"']\\s*:\\s*[\"']url"
							},
							"__template": {
								"url": ""
							},
							"url": "",
							"concurrent_streams": 5
						}, {
							"__condition": {
								"lines_regex": "type[\"']\\s*:\\s*[\"']s3"
							},
							"__template": {
								"bucket": ""
							},
							"bucket": "",
							"region": "",
							"base_path": "",
							"concurrent_streams": 5,
							"chunk_size": "10m",
							"compress": {
								"__one_of": [true, false]
							}
						}, {
							"__condition": {
								"lines_regex": "type[\"']\\s*:\\s*[\"']hdfs"
							},
							"__template": {
								"path": ""
							},
							"uri": "",
							"path": "some/path",
							"load_defaults": {
								"__one_of": [true, false]
							},
							"conf_location": "cfg.xml",
							"concurrent_streams": 5,
							"compress": {
								"__one_of": [true, false]
							},
							"chunk_size": "10m"
						}]
					}
				},
				"url_params": {},
				"id": "put_repository"
			},
			"_search": {
				"methods": ["GET", "POST"],
				"priority": 10,
				"patterns": ["{indices}/{types}/_search", "{indices}/_search", "_search"],
				"url_params": {
					"q": "",
					"df": "",
					"analyzer": "",
					"default_operator": ["AND", "OR"],
					"explain": "__flag__",
					"_source": "",
					"_source_include": "",
					"_source_exclude": "",
					"stored_fields": [],
					"sort": "",
					"track_scores": "__flag__",
					"timeout": 1,
					"from": 0,
					"size": 10,
					"search_type": ["dfs_query_then_fetch", "dfs_query_and_fetch", "query_then_fetch", "query_and_fetch"],
					"terminate_after": 10,
					"lowercase_expanded_terms": ["true", "false"],
					"analyze_wildcard": "__flag__",
					"preference": ["_primary", "_primary_first", "_local", "_only_node:xyz", "_prefer_node:xyz", "_shards:2,3"],
					"scroll": "5m",
					"scroll_id": "",
					"routing": "",
					"request_cache": ["true", "false"],
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"data_autocomplete_rules": {
					"query": {},
					"aggs": {
						"__template": {
							"NAME": {
								"AGG_TYPE": {}
							}
						}
					},
					"post_filter": {
						"__scope_link": "GLOBAL.filter"
					},
					"size": {
						"__template": 20
					},
					"from": 0,
					"sort": {
						"__template": [{
							"FIELD": {
								"order": "desc"
							}
						}],
						"__any_of": [{
							"{field}": {
								"order": {
									"__one_of": ["desc", "asc"]
								},
								"missing": {
									"__one_of": ["_last", "_first"]
								},
								"mode": {
									"__one_of": ["min", "max", "avg", "sum"]
								},
								"nested_path": "",
								"nested_filter": {
									"__scope_link": "GLOBAL.filter"
								}
							}
						}, "{field}", "_score", {
							"_geo_distance": {
								"__template": {
									"FIELD": {
										"lat": 40,
										"lon": -70
									},
									"order": "asc"
								},
								"{field}": {
									"__one_of": [{
											"__template": {
												"lat": 40,
												"lon": -70
											},
											"lat": 40,
											"lon": -70
										},
										[{
											"__template": {
												"lat": 40,
												"lon": -70
											},
											"lat": 40,
											"lon": -70
										}],
										[""], ""
									]
								},
								"distance_type": {
									"__one_of": ["sloppy_arc", "arc", "plane"]
								},
								"sort_mode": {
									"__one_of": ["min", "max", "avg"]
								},
								"order": {
									"__one_of": ["asc", "desc"]
								},
								"unit": "km"
							}
						}]
					},
					"stored_fields": ["{field}"],
					"docvalue_fields": ["{field}"],
					"script_fields": {
						"__template": {
							"FIELD": {
								"script": {}
							}
						},
						"*": {
							"__scope_link": "GLOBAL.script"
						}
					},
					"partial_fields": {
						"__template": {
							"NAME": {
								"include": []
							}
						},
						"*": {
							"include": [],
							"exclude": []
						}
					},
					"highlight": {},
					"_source": {
						"__one_of": ["{field}", ["{field}"], {
							"include": {
								"__one_of": ["{field}", ["{field}"]]
							},
							"exclude": {
								"__one_of": ["{field}", ["{field}"]]
							}
						}]
					},
					"explain": {
						"__one_of": [true, false]
					},
					"stats": [""],
					"timeout": "1s",
					"version": {
						"__one_of": [true, false]
					}
				},
				"id": "_search"
			},
			"_search_template": {
				"methods": ["GET"],
				"patterns": ["{indices}/{types}/_search/template", "{indices}/_search/template", "_search/template"],
				"data_autocomplete_rules": {
					"template": {
						"__one_of": [{
							"__scope_link": "_search"
						}, {
							"__scope_link": "GLOBAL.script"
						}]
					},
					"params": {}
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_search_template"
			},
			"_render_search_template": {
				"methods": ["GET"],
				"patterns": ["_render/template"],
				"data_autocomplete_rules": {
					"__one_of": [{
						"inline": {
							"__scope_link": "_search"
						}
					}, {
						"__scope_link": "GLOBAL.script"
					}],
					"params": {}
				},
				"url_params": {},
				"id": "_render_search_template"
			},
			"_render_search_template_with_id": {
				"methods": ["GET"],
				"patterns": ["_render/template/{id}"],
				"data_autocomplete_rules": {
					"params": {}
				},
				"url_params": {},
				"id": "_render_search_template_with_id"
			},
			"_get_delete_search_template": {
				"methods": ["GET", "DELETE"],
				"patterns": ["_search/template/{id}"],
				"url_params": {},
				"id": "_get_delete_search_template"
			},
			"_put_search_template": {
				"methods": ["PUT"],
				"patterns": ["_search/template/{id}"],
				"data_autocomplete_rules": {
					"template": {
						"__scope_link": "_search"
					}
				},
				"url_params": {},
				"id": "_put_search_template"
			},
			"_search_shards": {
				"methods": ["GET"],
				"priority": 10,
				"patterns": ["{indices}/{types}/_search_shards", "{indices}/_search_shards", "_search_shards"],
				"url_params": {
					"preference": ["_primary", "_primary_first", "_local", "_only_node:xyz", "_prefer_node:xyz", "_shards:2,3"],
					"routing": "",
					"local": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_search_shards"
			},
			"_get_settings": {
				"patterns": ["{indices}/_settings", "_settings"],
				"url_params": {
					"flat_settings": "__flag__",
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_get_settings",
				"methods": ["GET"]
			},
			"_put_settings": {
				"methods": ["PUT"],
				"patterns": ["{indices}/_settings", "_settings"],
				"data_autocomplete_rules": {
					"refresh_interval": "1s",
					"number_of_shards": 5,
					"number_of_replicas": 1,
					"blocks.read_only": {
						"__one_of": [false, true]
					},
					"blocks.read": {
						"__one_of": [true, false]
					},
					"blocks.write": {
						"__one_of": [true, false]
					},
					"blocks.metadata": {
						"__one_of": [true, false]
					},
					"term_index_interval": 32,
					"term_index_divisor": 1,
					"translog.flush_threshold_ops": 5000,
					"translog.flush_threshold_size": "200mb",
					"translog.flush_threshold_period": "30m",
					"translog.disable_flush": {
						"__one_of": [true, false]
					},
					"cache.filter.max_size": "2gb",
					"cache.filter.expire": "2h",
					"gateway.snapshot_interval": "10s",
					"routing": {
						"allocation": {
							"include": {
								"tag": ""
							},
							"exclude": {
								"tag": ""
							},
							"require": {
								"tag": ""
							},
							"total_shards_per_node": -1
						}
					},
					"recovery.initial_shards": {
						"__one_of": ["quorum", "quorum-1", "half", "full", "full-1"]
					},
					"ttl.disable_purge": {
						"__one_of": [true, false]
					},
					"analysis": {
						"analyzer": {},
						"tokenizer": {},
						"filter": {},
						"char_filter": {}
					},
					"cache.query.enable": {
						"__one_of": [true, false]
					},
					"shadow_replicas": {
						"__one_of": [true, false]
					},
					"shared_filesystem": {
						"__one_of": [true, false]
					},
					"data_path": "path",
					"codec": {
						"__one_of": ["default", "best_compression", "lucene_default"]
					}
				},
				"url_params": {
					"ignore_unavailable": "__flag__",
					"allow_no_indices": "__flag__",
					"expand_wildcards": ["open", "closed"]
				},
				"id": "_put_settings"
			},
			"_delete_template": {
				"methods": ["DELETE"],
				"patterns": ["_template/{id}"],
				"url_params": {},
				"id": "_delete_template"
			},
			"_get_template": {
				"methods": ["GET"],
				"patterns": ["_template/{id}", "_template"],
				"url_params": {},
				"id": "_get_template"
			},
			"_put_template": {
				"methods": ["PUT"],
				"patterns": ["_template/{id}"],
				"data_autocomplete_rules": {
					"template": "index*",
					"warmers": {
						"__scope_link": "_warmer"
					},
					"test111": {
						"__scope_link": "_put_test111"
					},
					"mappings": {
						"__scope_link": "_put_mapping"
					},
					"settings": {
						"__scope_link": "_put_settings"
					}
				},
				"url_params": {},
				"id": "_put_template"
			}
		}
	}
}