from app.models import db, User, Note, Notebook

def seed_notes():
    demo = Note(
        user_id=1, notebook_id='1', title='Lorem Ipum', content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Lorem dolor sed viverra ipsum. Arcu dictum varius duis at consectetur lorem donec. Pharetra vel turpis nunc eget. Cras adipiscing enim eu turpis egestas pretium. Tellus id interdum velit laoreet id donec ultrices tincidunt. Non sodales neque sodales ut. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Hac habitasse platea dictumst vestibulum rhoncus. Elit ut aliquam purus sit.')
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
