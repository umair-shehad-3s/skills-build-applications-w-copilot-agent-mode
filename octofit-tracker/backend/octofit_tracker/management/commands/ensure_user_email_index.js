use octofit_db
db.user_octofit_tracker.createIndex({ "email": 1 }, { unique: true })
