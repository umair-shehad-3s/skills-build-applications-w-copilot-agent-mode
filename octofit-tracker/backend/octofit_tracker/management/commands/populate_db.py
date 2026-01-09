from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes team')
        dc = Team.objects.create(name='DC', description='DC superheroes team')

        # Create Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel, is_leader=True)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Banner', email='bruce@marvel.com', team=marvel)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc, is_leader=True)
        diana = User.objects.create(name='Diana Prince', email='diana@dc.com', team=dc)
        barry = User.objects.create(name='Barry Allen', email='barry@dc.com', team=dc)

        # Create Activities
        Activity.objects.create(user=tony, type='Running', duration=30, calories_burned=300, date=timezone.now())
        Activity.objects.create(user=steve, type='Cycling', duration=45, calories_burned=400, date=timezone.now())
        Activity.objects.create(user=clark, type='Swimming', duration=60, calories_burned=500, date=timezone.now())
        Activity.objects.create(user=diana, type='Yoga', duration=50, calories_burned=200, date=timezone.now())

        # Create Workouts
        w1 = Workout.objects.create(name='Super Strength', description='Strength workout', difficulty='Hard')
        w2 = Workout.objects.create(name='Speed Training', description='Speed workout', difficulty='Medium')
        w1.suggested_for.set([tony, bruce, clark])
        w2.suggested_for.set([steve, diana, barry])

        # Create Leaderboards
        Leaderboard.objects.create(team=marvel, total_points=1200, rank=1)
        Leaderboard.objects.create(team=dc, total_points=1100, rank=2)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
