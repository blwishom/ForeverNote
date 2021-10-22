from app.models import db, User, Note, Notebook

def seed_notebooks():
    demo = Notebook(
        user_id=1, title='The Notebook 1')
    marnie = Notebook(
        user_id=2, title='The Notebook 2')
    bobbie = Notebook(
        user_id=3, title='The Notebook 3')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notebooks():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
