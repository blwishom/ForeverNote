from app.models import db, User, Note

def seed_notes():
    demo = Note(
        user_id=1, title='The Note 1', content='This is a reminder that I am writing my first note')
    marnie = Note(
        user_id=2, title='The Note 2', content='This is a reminder that I am writing my second note')
    bobbie = Note(
        user_id=3, title='The Note 3', content='This is a reminder that I am writing my third note')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
