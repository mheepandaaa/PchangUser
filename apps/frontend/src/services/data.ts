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
        image: 'https://img-global.cpcdn.com/recipes/21dd4da8fe44301e/680x482cq70/%E0%B8%A3%E0%B8%9B-%E0%B8%AB%E0%B8%A5%E0%B8%81-%E0%B8%82%E0%B8%AD%E0%B8%87-%E0%B8%AA%E0%B8%95%E0%B8%A3-%E0%B8%9C%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%AA%E0%B8%9A.jpg',
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
                        price: 0
                    },
                    {
                        name: 'หมูกรอบ',
                        price: 5
                    },
                    {
                        name: 'เบค่อน',
                        price: 5
                    },
                    {
                        name: 'กุ้ง',
                        price: 10
                    },
                    {
                        name: 'ปลาหมึก',
                        price: 10
                    },
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
    },
    {
        id: '2',
        title: 'ข้าวผัด',
        price: 30,
        image: 'https://img.wongnai.com/p/1920x0/2019/12/19/d5537700a7274ac09964b6a51dd0a9f6.jpg',
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
                        price: 0
                    },
                    {
                        name: 'หมูกรอบ',
                        price: 5
                    },
                    {
                        name: 'เบค่อน',
                        price: 5
                    },
                    {
                        name: 'กุ้ง',
                        price: 10
                    },
                    {
                        name: 'ปลาหมึก',
                        price: 10
                    },
                    {
                        name: 'แหนม',
                        price: 10
                    },
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
    },
    {
        id: '3',
        title: 'ผัดพริกเผา',
        price: 40,
        image: 'https://s359.kapook.com/pagebuilder/583c6c30-a473-4c2e-a90c-f14228cae9a9.jpg',
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
                        price: 0
                    },
                    {
                        name: 'หมูกรอบ',
                        price: 5
                    },
                    {
                        name: 'เบค่อน',
                        price: 5
                    },
                    {
                        name: 'กุ้ง',
                        price: 10
                    },
                    {
                        name: 'ปลาหมึก',
                        price: 10
                    },
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
