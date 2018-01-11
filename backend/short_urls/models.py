from django.db import models, transaction, IntegrityError
from django.db.models import Max
from django.db.models.functions import Length
from django.utils import timezone

from short_urls.utils import gen_short_url


class UrlMapping(models.Model):
    date_created = models.DateTimeField(default=timezone.now)
    short_url = models.CharField(max_length=64, unique=True)
    full_url = models.TextField(db_index=True)

    def generate_and_save(self):
        # Initial length starts at 5. If the number of retries get exhausted, it's increased
        # and next time it starts with the new value. Give up after 3 length increases (shouldn't happen)
        start_length = max(
            5,
            UrlMapping.objects.aggregate(max_length=Max(Length('short_url')))['max_length'] or 0,
        )
        for length in range(start_length, start_length + 3):
            # Give it 5 tries to generate a short link with the given length before increasing the length
            for _ in range(0, 5):
                with transaction.atomic():
                    try:
                        self.short_url = gen_short_url(length)
                        self.save()
                        return
                    except IntegrityError:  # Already exists
                        pass
        raise Exception('Could not find a free short_url')
