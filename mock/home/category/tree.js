function mock() {
    let data = {
        success: true,
        data: [
            {
                id: 1,
                paraent_id: 0,
                category_title: '大类1',
                category_icon: '',
                create_time: '2018-06-10',
                child: [
                    {
                        id: 1,
                        paraent_id: 1,
                        category_title: '大类1',
                        category_icon: '',
                        create_time: '2018-06-10'
                    },
                    {
                        id: 2,
                        paraent_id: 1,
                        category_title: '大类2',
                        category_icon: '',
                        create_time: '2018-06-10'
                    }
                ]
            },
            {
                id: 2,
                paraent_id: 0,
                category_title: '大类2',
                category_icon: '',
                create_time: '2018-06-10',
                child: [
                    {
                        id: 1,
                        paraent_id: 2,
                        category_title: '大类1',
                        category_icon: '',
                        create_time: '2018-06-10'
                    },
                    {
                        id: 2,
                        paraent_id: 2,
                        category_title: '大类2',
                        category_icon: '',
                        create_time: '2018-06-10'
                    }
                ]
            },
            {
                id: 3,
                paraent_id: 1,
                category_title: '大类1-1',
                category_icon: '',
                create_time: '2018-06-10',
                child: [
                    {
                        id: 1,
                        paraent_id: 3,
                        category_title: '大类1',
                        category_icon: '',
                        create_time: '2018-06-10'
                    },
                    {
                        id: 2,
                        paraent_id: 3,
                        category_title: '大类2',
                        category_icon: '',
                        create_time: '2018-06-10'
                    }
                ]
            }
        ],
        msg: '成功'
    }
    return data
}
module.exports = mock