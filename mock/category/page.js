function mock() {
    let data = {
        success: true,
        code: 0,
        data: [
            {
                id: 1,
                paraent_id: 0,
                category_title: '大类1',
                category_icon: '',
                create_time: '2018-06-10'
            },
            {
                id: 2,
                paraent_id: 0,
                category_title: '大类2',
                category_icon: '',
                create_time: '2018-06-10'
            },
            {
                id: 3,
                paraent_id: 1,
                category_title: '大类1-1',
                category_icon: '',
                create_time: '2018-06-10'
            }
        ],
        msg: '成功',
        total: 100,
        count: 100
    }
    return data
}
module.exports = mock