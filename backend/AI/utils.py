def get_json_format():
    json = '''{"Name": "", "Age":, "Height": "", "Weight": "", "BMI": "", "Current Medications": "", "Consultation 
    Notes": ""}'''

    return json


def make_prompt(conv):
    json = get_json_format()
    prompt = (f"Based on the conversation that I am providing here: {conv}. I have a json that is needed to be filled. "
              f"Following is the format of json: ") + json + (" Can you please fill all the fields you think have been "
                                                              "answered while returning an empty string for the "
                                                              "unanswered ones. Only return the json. Also, if you do "
                                                              "not"
                                                              "find an answer for any field please leave it blank. Do "
                                                              "not"
                                                              "by any chance fill anything that you do not see in the "
                                                              "conversation. If there is nothing you can fill just "
                                                              "return the json as it is")

    return prompt
