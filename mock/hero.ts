
let heros: CMS.Hero[] = [
  {
    id: 1,
    name: '阿古朵',
    gender: '女',
    skill: '峡谷总动员',
    position: '坦克',
    address: 'https://pvp.qq.com/web201605/herodetail/533.shtml'
  },
  {
    id: 2,
    name: '蒙恬',
    gender: '男',
    skill: '玄雍众将',
    position: '战士',
    address: 'https://pvp.qq.com/web201605/herodetail/527.shtml'
  },
  {
    id: 3,
    name: '镜',
    gender: '女',
    skill: '刺客',
    position: '坦克',
    address: 'https://pvp.qq.com/web201605/herodetail/531.shtml'
  },
  {
    id: 4,
    name: '蒙犽',
    gender: '男',
    skill: '飞弹援袭',
    position: '射手',
    address: 'https://pvp.qq.com/web201605/herodetail/524.shtml'
  },
  {
    id: 5,
    name: '鲁班大师',
    gender: '男',
    skill: '强力收纳',
    position: '坦克',
    address: 'https://pvp.qq.com/web201605/herodetail/525.shtml'
  },
  {
    id: 6,
    name: '西施',
    gender: '女',
    skill: '心无旁骛',
    position: '法师',
    address: 'https://pvp.qq.com/web201605/herodetail/523.shtml'
  },
  {
    id: 7,
    name: '马超',
    gender: '男',
    skill: '万刃归鞘',
    position: '战士',
    address: 'https://pvp.qq.com/web201605/herodetail/518.shtml'
  },
  {
    id: 8,
    name: '曜',
    gender: '男',
    skill: '归尘',
    position: '战士',
    address: 'https://pvp.qq.com/web201605/herodetail/522.shtml'
  },
  {
    id: 9,
    name: '云中君',
    gender: '男',
    skill: '风雷引',
    position: '刺客',
    address: 'https://pvp.qq.com/web201605/herodetail/506.shtml'
  },
  {
    id: 10,
    name: '瑶',
    gender: '女',
    skill: '独立兮山之上',
    position: '辅助',
    address: 'https://pvp.qq.com/web201605/herodetail/505.shtml'
  }
]

export default {
  'GET /api/heros': heros
}