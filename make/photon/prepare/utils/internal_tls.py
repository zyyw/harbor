
def prepare_tls(config_dict):
    config_dict['_config'].internal_tls.prepare()
    config_dict['_config'].internal_tls.validate()