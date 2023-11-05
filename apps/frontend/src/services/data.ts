interface MenuValues {
    name: string
    price: number | null
}

interface MenuOptions {
    title: string
    required: number
    options: MenuValues[]
}

export interface Menu {
    id: string
    title: string
    price: number
    image: string
    options: MenuOptions[]
}

export const menus: Menu[] = [
    {
        id: '1',
        title: 'กระเพรา',
        price: 45,
        image: 'https://pbs.twimg.com/profile_images/1542939256561094664/dC7tnzGt_400x400.jpg',
        options: [
            {
                title: 'ประเภทเนื้อสัตว์',
                required: 1,
                options: [
                    {
                        name: 'หมู',
                        price: 0
                    },
                    {
                        name: 'ไก่',
                        price: 5
                    },
                    {
                        name: 'หมูกรอบ',
                        price: 5
                    },
                    {
                        name: 'เบค่อน',
                        price: 0
                    }
                ]
            },
            {
                title: 'ระดับความเผ็ด',
                required: 1,
                options: [
                    {
                        name: 'ไม่เผ็ด',
                        price: null
                    },
                    {
                        name: 'เผ็ดน้อย',
                        price: null
                    },
                    {
                        name: 'เผ็ดปกติ',
                        price: null
                    },
                    {
                        name: 'เผ็ดมาก',
                        price: null
                    }
                ]
            },
            {
                title: 'พิเศษ',
                required: 0,
                options: [
                    {
                        name: 'พิเศษ',
                        price: 5
                    }
                ]
            },
            {
                title: 'เพิ่มไข่',
                required: 0,
                options: [
                    {
                        name: 'ไข่ดาว',
                        price: null
                    },
                    {
                        name: 'ไข่เจียว',
                        price: null
                    }
                ]
            },
            {
                title: 'ภาชนะ',
                required: 0,
                options: [
                    {
                        name: 'ใส่จาน',
                        price: null
                    },
                    {
                        name: 'ใส่กล่อง',
                        price: null
                    }
                ]
            }
        ]
    }
]
