def get_json_format():
    json = '''
    {
  "patient": {
    "full_name": "",
    "date_of_birth": "",
    "gender": "",
    "address": "",
    "phone_number": "",
    "email": "",
    "emergency_contact_number": "",
    "patient_id": "", 
  },
  "history": {
    "primary_care_physician": "",
    "medical_history": "",
    "surgical_history": "",
    "family_medical_history": "",
    "medication_history": "",
    "social_history": "",
    "known_allergies": "",
    "list_of_vaccinations": [],
    "current_medications": [],
    "dosages": []
  },
  "vitals": {
    "blood_pressure": "",
    "heart_rate": "",
    "respiratory_rate": "",
    "temperature": ""
  },
  "physical_attributes": {
    "height": "",
    "weight": "",
    "bmi": ""
  },
  "appointment_notes": {
    "health_insurance_info": "",
    "reason_for_visit": "",
    "subjective_assessment": {
      "onset_of_symptoms": "",
      "palliating_or_provoking_factors": "",
      "region_affected": "",
      "severity_of_symptoms": "",
      "time_course_of_symptoms": ""
    },
    "objective_assessment": {
      "physical_symptoms": "",
      "consultation_notes": "",
      "follow_up_plan": "",
      "recommended_follow_up_appointments": ""
    }
  }
}
    '''

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
