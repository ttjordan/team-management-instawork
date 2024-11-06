from django.core.exceptions import ValidationError
from django.db import models

def validate_phone_number(value):
    if not value.isdigit():
        raise ValidationError('Phone number should contain only digits.')
    if len(value) < 8 or len(value) > 15: # max and min num of digits in phone num as defined by ITU-T E.164 standard
        raise ValidationError('Phone number must be between 10 and 15 digits.')

class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('regular', 'Regular'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, validators=[validate_phone_number])  # Add validator here
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='regular')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
