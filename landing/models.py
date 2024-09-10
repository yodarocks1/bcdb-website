from django.db import models
from django.contrib.auth.models import User

class Reference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=20)
    relation = models.CharField(max_length=48)
    reference = models.TextField()

    def __str__(self):
        return f"{self.name} @ {self.user.username}"
