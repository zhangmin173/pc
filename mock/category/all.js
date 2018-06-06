function mock() {
    let data = {
        success: true,
        data: [
            {
                id: 1,
                paraent_id: 0,
                category_title: '大类1',
                category_icon: '',
                create_time: '2018-06-10'
            },
            {
                id: 1,
                paraent_id: 0,
                category_title: '大类2',
                category_icon: '',
                create_time: '2018-06-10'
            },
            {
                id: 1,
                paraent_id: 0,
                category_title: '大类3',
                category_icon: '',
                create_time: '2018-06-10'
            }
        ],
        msg: '成功'
    }
    return data
}
module.exports = mock