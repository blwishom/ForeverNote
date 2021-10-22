"""empty message

Revision ID: bc0f7ab6c794
Revises: ffdc0a98111c
Create Date: 2021-10-22 10:03:28.113780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bc0f7ab6c794'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notebooks', sa.Column('note_id', sa.Integer(), nullable=False))
    op.alter_column('notebooks', 'title',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
    op.create_unique_constraint(None, 'notebooks', ['title'])
    op.create_foreign_key(None, 'notebooks', 'notes', ['note_id'], ['id'])
    op.create_foreign_key(None, 'notebooks', 'users', ['user_id'], ['id'])
    op.drop_column('notebooks', 'notes_id')
    op.add_column('notes', sa.Column('notebook_id', sa.Integer(), nullable=False))
    op.alter_column('notes', 'title',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
    op.create_unique_constraint(None, 'notes', ['title'])
    op.create_foreign_key(None, 'notes', 'notebooks', ['notebook_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'notes', type_='foreignkey')
    op.drop_constraint(None, 'notes', type_='unique')
    op.alter_column('notes', 'title',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)
    op.drop_column('notes', 'notebook_id')
    op.add_column('notebooks', sa.Column('notes_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'notebooks', type_='foreignkey')
    op.drop_constraint(None, 'notebooks', type_='foreignkey')
    op.drop_constraint(None, 'notebooks', type_='unique')
    op.alter_column('notebooks', 'title',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)
    op.drop_column('notebooks', 'note_id')
    # ### end Alembic commands ###
