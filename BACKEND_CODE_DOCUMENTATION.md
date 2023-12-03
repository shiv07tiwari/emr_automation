# Code Documentation

Altogether, this project consists of a Django application that uses GPT-3.5 to process patient data based on a provided conversation ID.

# Dependencies
Here's what each dependency is used for:

- **django**: The core framework of the application.
`pip3 install django`
- **django-rest-framework**: A powerful and flexible toolkit for building Web APIs.
`pip3 install django-rest-framework`
- **openai**: Library used to integrate the application with OpenAI's GPT-3.5.
`pip3 install openai`
- **Faker**: A Python package to generate fake data for testing.
`pip3 install faker`
- **corsheaders**: A Django App that adds Cross-Origin Resource Sharing (CORS) headers to responses.
`pip3 install django-cors-headers`
- **bootstrap4**: A Django already pre-configured installation of bootstrap 4 to manage static files.
`pip3 install bootstrap4`

# Endpoint

The application's endpoint accepts text data and a conversation ID, which it then passes to GPT-3.5. Based on the provided transcript, the model returns a JSON response with patient individual and appointment details.
End Point: `{BASE_URL}/audio-analysis/`

# Response Format

The following information is included within the JSON response (and will be reachable as `response.patient`, `response.history`, `response.vitals`, etc):
```
{
  "patient": {
    "full_name": "John Doe",
    "date_of_birth": "1990-01-01",
    "gender": "Male",
    "address": "123 Main Street, New York, NY, USA",
    "phone_number": "9876543210",
    "email": "john.doe@gmail.com",
    "emergency_contact_number": "9876543211",
    "patient_id": "PAT123"
  },
  "history": {
    "primary_care_physician": "Dr. Jane Smith",
    "medical_history": "No major illnesses or conditions.",
    "surgical_history": "Appendectomy at age 25.",
    "family_medical_history": "Father with heart disease, mother with diabetes.",
    "medication_history": "Has been on blood pressure medication since 2019.",
    "social_history": "Non-smoker, drinks socially.",
    "known_allergies": "Peanuts",
    "list_of_vaccinations": ["Hepatitis B", "MMR", "Varicella", "Tdap", "COVID-19"],
    "current_medications": ["Lisinopril", "Multivitamin"],
    "dosages": ["20mg daily", "once daily"]
  },
  "vitals": {
    "blood_pressure": "120/80",
    "heart_rate": "72",
    "respiratory_rate": "12",
    "temperature": "98.6"
  },
  "physical_attributes": {
    "height": "5'10\"",
    "weight": "180 lbs",
    "bmi": "25.8"
  },
  "appointment_notes": {
    "health_insurance_info": "Blue Cross Blue Shield, Member ID 123456789",
    "reason_for_visit": "Routine check-up.",
    "subjective_assessment": {
      "onset_of_symptoms": "N/A",
      "palliating_or_provoking_factors": "N/A",
      "region_affected": "N/A",
      "severity_of_symptoms": "N/A",
      "time_course_of_symptoms": "N/A"
    },
    "objective_assessment": {
      "physical_symptoms": "N/A",
      "consultation_notes": "Patient is in good health. Continue current meds and healthy lifestyle habits.",
      "follow_up_plan": "Return in one year for routine check-up, or as needed.",
      "recommended_follow_up_appointments": "N/A"
    }
  }
}
```