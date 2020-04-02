from django.test import TestCase
from activix_api.models import *

# Create your tests here.


def test_daily_log():
    me = AuthUser.objects.get(id=1)
    me.generate_daily_log()


def main():
    test_daily_log()


if __name__ == "__main__":
    main()
