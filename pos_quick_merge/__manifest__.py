# -*- coding: utf-8 -*-
{
    'name': "POS Order Quick Merge",

    'summary': "Pos order Quick merge ",

    'description': """
     1. order merge.
     2. translate
    """,

    'price': '49.99',
    'currency':'USD',
    'support':'xb0129@gmail.com',

    'author': "Bin Xu",
    'website': "https://isonzea.com",

    'images': ['static/description/1.png','static/description/2.png'],
    'category': 'Sales/Point Of Sale',
    'version': '1.0',

    'depends': ['point_of_sale'],

    'assets': {
        'point_of_sale._assets_pos': [
            'pos_merge/static/src/**/*'
            ],
    },
    'license': 'OPL-1',
    'application':True,
    'installable':True,
}

