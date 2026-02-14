/**
 * 配置常量与枚举定义
 */

const CONFIG = {
    // 登录凭证 (环境变量 FARM_CODE)
    code: process.env.FARM_CODE || '',

    // QQ扫码登录 (环境变量 FARM_QR_LOGIN, 或 --qr 参数)
    qrLogin: process.env.FARM_QR_LOGIN === 'true',

    serverUrl: 'wss://gate-obt.nqf.qq.com/prod/ws',
    clientVersion: '1.6.0.14_20251224',
    platform: process.env.FARM_PLATFORM === 'wx' ? 'wx' : 'qq',  // 环境变量 FARM_PLATFORM: qq(默认) 或 wx
    os: 'iOS',
    heartbeatInterval: 25000,    // 心跳间隔 25秒
    farmCheckInterval: Math.max((parseInt(process.env.FARM_CHECK_INTERVAL) || 1) * 1000, 1000),   // 环境变量 FARM_CHECK_INTERVAL (秒), 最低1秒
    friendCheckInterval: Math.max((parseInt(process.env.FARM_FRIEND_CHECK_INTERVAL) || 10) * 1000, 1000),  // 环境变量 FARM_FRIEND_CHECK_INTERVAL (秒), 最低1秒
    forceLowestLevelCrop: process.env.FARM_FORCE_LOWEST_CROP === 'true',  // 环境变量 FARM_FORCE_LOWEST_CROP

    // 种子排除列表: 白萝卜(20002), 胡萝卜(20003)
    excludedSeeds: [20002, 20003],
    // 从前N个最优种子中随机选择 (环境变量 FARM_TOP_CANDIDATES, 默认5)
    topCandidateCount: parseInt(process.env.FARM_TOP_CANDIDATES) || 5,

    // 偷菜白名单: 白名单中的好友不偷菜，但仍然帮忙浇水/除草/除虫
    // 支持 gid (纯数字) 和 name (非数字字符串) 混合，逗号分隔
    // 环境变量 FARM_STEAL_WHITELIST, 例: "小明,123456,小红"
    stealWhitelist: (() => {
        const raw = process.env.FARM_STEAL_WHITELIST || '';
        if (!raw.trim()) return { gids: new Set(), names: new Set() };
        const gids = new Set();
        const names = new Set();
        for (const item of raw.split(',')) {
            const trimmed = item.trim();
            if (!trimmed) continue;
            if (/^\d+$/.test(trimmed)) {
                gids.add(parseInt(trimmed, 10));
            } else {
                names.add(trimmed);
            }
        }
        return { gids, names };
    })(),

    // 设备信息 (用于登录时模拟客户端)
    device_info: {
        client_version: '1.6.0.14_20251224',
        sys_software: 'iOS 26.2.1',
        network: 'wifi',
        memory: '7672',
        device_id: 'iPhone X<iPhone18,3>',
    },
};

// 运行期提示文案（做了简单编码，避免明文散落）
const RUNTIME_HINT_MASK = 23;
const RUNTIME_HINT_DATA = [
    12295, 22759, 26137, 12294, 26427, 39022, 30457, 24343, 28295, 20826,
    36142, 65307, 20018, 31126, 20485, 21313, 12309, 35808, 20185, 20859,
    24343, 20164, 24196, 20826, 36142, 33696, 21441, 12309,
];

// 生长阶段枚举
const PlantPhase = {
    UNKNOWN: 0,
    SEED: 1,
    GERMINATION: 2,
    SMALL_LEAVES: 3,
    LARGE_LEAVES: 4,
    BLOOMING: 5,
    MATURE: 6,
    DEAD: 7,
};

const PHASE_NAMES = ['未知', '种子', '发芽', '小叶', '大叶', '开花', '成熟', '枯死'];

module.exports = {
    CONFIG,
    PlantPhase,
    PHASE_NAMES,
    RUNTIME_HINT_MASK,
    RUNTIME_HINT_DATA,
};
