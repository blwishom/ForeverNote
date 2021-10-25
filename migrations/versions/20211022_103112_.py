"""empty message

Revision ID: 6bd71113ae65
Revises: 1087fbe8ef22
Create Date: 2021-10-22 10:31:12.210382

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bd71113ae65'
down_revision = '1087fbe8ef22'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'notebook_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'notebook_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
