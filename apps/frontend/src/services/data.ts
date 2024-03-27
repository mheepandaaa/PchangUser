import axios from 'axios';

interface MenuValues {
  name: string;
  price: number | null;
}

interface MenuOptions {
  title: string;
  required: number;
  options: MenuValues[];
}

export interface Menu {
  id: number;
  title: string;
  price: number;
  image: string;
  options: MenuOptions[];
}

export interface Order {
    menu_id: number;
    meat: string;
    spicy: string;
    extra: boolean;
    egg: string;
    optional_text: string;
    container: string;
  }

export const fetchMenus = async () => {
    try {
        const response = await axios.get<Menu[]>('http://localhost:3001/getMenuWithOptionals/');
        return response.data.menus;
    } catch (error) {
        console.error('Error fetching menus:', error);
        return [];
    }
  };


export const menus: Menu[] = [
    {
            "id": 1,
            "title": "กระเพรา",
            "image": "https://pchangproject.s3.amazonaws.com/IMG_20230710_121725.jpg",
            "price": 45,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": [
                        {
                            "name": "หมู",
                            "price": 0
                        },
                        {
                            "name": "ไก่",
                            "price": 0
                        },
                        {
                            "name": "หมูกรอบ",
                            "price": 5
                        },
                        {
                            "name": "เบค่อน",
                            "price": 5
                        },
                        {
                            "name": "กุ้ง",
                            "price": 10
                        },
                        {
                            "name": "ปลาหมึก",
                            "price": 10
                        }
                    ]
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": [
                        {
                            "name": "ไม่เผ็ด",
                            "price": null
                        },
                        {
                            "name": "เผ็ดน้อย",
                            "price": null
                        },
                        {
                            "name": "เผ็ดปกติ",
                            "price": null
                        },
                        {
                            "name": "เผ็ดมาก",
                            "price": null
                        }
                    ]
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": [
                        {
                            "name": "ไข่ดาว",
                            "price": 0
                        },
                        {
                            "name": "ไข่เจียว",
                            "price": 0
                        }
                    ]
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": [
                        {
                            "name": "จาน",
                            "price": 0
                        },
                        {
                            "name": "กล่อง",
                            "price": 0
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "title": "ข้าวผัด",
            "image": "https://pchangproject.s3.amazonaws.com/IMG_20230710_121622.jpg",
            "price": 30,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 3,
            "title": "ข้าวผัดแหนม",
            "image": "https://pchangproject.s3.amazonaws.com/sourpork-firedrice.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 4,
            "title": "ผัดพริกเผา",
            "image": "https://pchangproject.s3.amazonaws.com/prikpow.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 5,
            "title": "ผัดพริกแกง",
            "image": "https://pchangproject.s3.amazonaws.com/prikgang.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 6,
            "title": "ราดหน้า",
            "image": "https://pchangproject.s3.amazonaws.com/radnha.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 7,
            "title": "ซีอิ๊ว",
            "image": "https://pchangproject.s3.amazonaws.com/si-ew.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 8,
            "title": "กะเพราคลุกข้าว",
            "image": "https://pchangproject.s3.amazonaws.com/krapowkluk.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 9,
            "title": "ข้าวต้มทรงเครื่อง",
            "image": "https://pchangproject.s3.amazonaws.com/ricePorridge.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 10,
            "title": "ผัดผงกะหรี่",
            "image": "https://pchangproject.s3.amazonaws.com/padkraree.jpg",
            "price": 45,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 11,
            "title": "มาม่าผัดไข่",
            "image": "https://pchangproject.s3.amazonaws.com/mamapadkai.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 12,
            "title": "มาม่าผัดขี้เมา",
            "image": "https://pchangproject.s3.amazonaws.com/IMG_20230710_123302.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 13,
            "title": "ผัดน้ำมันหอย",
            "image": "https://pchangproject.s3.amazonaws.com/padOysterSauce.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 14,
            "title": "ผัดกระเทียม",
            "image": "https://pchangproject.s3.amazonaws.com/padgarlic.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 15,
            "title": "สุกี้น้ำ/แห้ง",
            "image": "https://pchangproject.s3.amazonaws.com/IMG_20230710_122957.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 16,
            "title": "มักกะโรนีผัดซอส",
            "image": "https://pchangproject.s3.amazonaws.com/maccaroni.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        },
        {
            "id": 17,
            "title": "สปาเก็ตตี้ราดซอส",
            "image": "https://pchangproject.s3.amazonaws.com/spagetti.jpg",
            "price": 40,
            "options": [
                {
                    "title": "ประเภทเนื้อสัตว์",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "ระดับความเผ็ด",
                    "required": 1,
                    "options": []
                },
                {
                    "title": "เพิ่มไข่",
                    "required": 0,
                    "options": []
                },
                {
                    "title": "ภาชนะ",
                    "required": 1,
                    "options": []
                }
            ]
        }
]