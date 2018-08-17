// 精神病配置
var mentalDisorder = {
    f: {
        // 精神病人员主键	String
        id: '',
        // 行政区划编号	String
        dataAreaCode: '',
        // 证件号码	String
        idNum: '',
        // 姓名	String
        name: '',
        // 曾用名	String
        oldName: '',
        // 性别	String
        sex: '',
        // 出生日期	String
        date: '',
        // 民族	String
        nation: '',
        // 籍贯	String
        root: '',
        // 婚姻状况	String
        marry: '',
        // 政治面貌	String
        status: '',
        // 文化程度	String
        education: '',
        // 宗教信仰	String
        creed: '',
        // 职业类别	String
        career: '',
        // 职业	String
        job: '',
        // 服务处所	String
        server: '',
        // 联系方式	String
        contact: '',
        // 户籍地	String
        domicile: '',
        // 户籍详细地址	String
        domAdd: '',
        // 现住地	String
        residence: '',
        // 现住地详细地址	String
        resAdd: '',
        // 家庭经济状况	String
        familyEco: '',
        // 是否纳人低保	String
        subAllowances: '',
        // 监护人公民身份号码	String
        guardId: '',
        // 监护人姓名	String
        guardName: '',
        // 监护人联系方式	String
        guardCon: '',
        // 初次发病日期	String
        firstDate: '',
        // 目前诊断类型	String
        diaStyle: '',
        // 有无肇事肇祸史	String
        accident: '',
        // 肇事肇祸次数	String
        accNum: '',
        // 上次肇事肇祸日期	String
        accDate: '',
        // 目前危险性评估等级	String
        danLevel: '',
        // 治疗情况	String
        treatSit: '',
        // 治疗医院名称	String
        hosName: '',
        // 实施住院治疗原因	String
        hosReason: '',
        // 接收康复训练机构名称	String
        recName: '',
        // 帮扶情况	String
        helpSit: '',
        // 监护人与患者关系	String
        guardRelation: '',
        // 人员类别	String
        pepType: '',
        // 关注程度	String
        followDegree: '',
        // 参与管理人员	String
        manager: '',
        coordinate: ''
    },
    show: [{
        text: '公民身份号码',
        value: 'idNum',
        validate: true,
        type: 'certificate'
    }, {
        text: '姓名',
        value: 'name',
        validate: true,
        type: 'string'
    }, {
        text: '曾用名',
        value: 'oldName',
        validate: false,
        type: 'string'
    }, {
        text: '性别',
        value: 'sex',
        validate: true,
        type: 'radio',
        dictionary: 'gentles',
        valueName: '',
        options: []
    }, {
        text: '出生日期',
        value: 'date',
        validate: false,
        type: 'date'
    }, {
        text: '民族',
        value: 'nation',
        validate: true,
        type: 'radio',
        dictionary: 'familyname',
        valueName: '',
        options: []
    }, {
        text: '籍贯',
        value: 'root',
        validate: true,
        type: 'string'
    }, {
        text: '婚姻状况',
        value: 'marry',
        validate: true,
        type: 'radio',
        dictionary: 'hyzk',
        valueName: '',
        options: []
    }, {
        text: '政治面貌',
        value: 'status',
        validate: true,
        type: 'radio',
        dictionary: 'zzmm',
        valueName: '',
        options: []
    }, {
        text: '学历',
        value: 'education',
        validate: true,
        type: 'radio',
        dictionary: 'edutation',
        valueName: '',
        options: []
    }, {
        text: '宗教信仰',
        value: 'creed',
        validate: false,
        type: 'radio',
        dictionary: 'FLOW_ZJXY',
        valueName: '',
        options: []
    }, {
        text: '职业类别',
        value: 'career',
        validate: true,
        type: 'radio',
        dictionary: 'ZYLB',
        valueName: '',
        options: []
    }, {
        text: '职业',
        value: 'job',
        validate: true,
        type: 'string'
    }, {
        text: '服务处所',
        value: 'server',
        validate: false,
        type: 'string'
    }, {
        text: '联系方式',
        value: 'contact',
        validate: true,
        type: 'mobile'
    }, {
        text: '户籍地',
        value: 'domicile',
        validate: true,
        type: 'string'
    }, {
        text: '户籍门（楼）详址',
        value: 'domAdd',
        validate: true,
        type: 'string'
    }, {
        text: '现住地',
        value: 'residence',
        validate: true,
        type: 'string'
    }, {
        text: '现住门（楼）详址',
        value: 'resAdd',
        validate: true,
        type: 'string'
    }, {
        text: '家庭经济状况',
        value: 'familyEco',
        validate: false,
        type: 'radio',
        dictionary: 'JTJJZK',
        valueName: '',
        options: []
    }, {
        text: '是否纳人低保',
        value: 'subAllowances',
        validate: true,
        type: 'radio',
        dictionary: 'sfzdgzry',
        valueName: '',
        options: []
    }, {
        text: ' 监护人公民身份号码',
        value: 'guardId',
        validate: false,
        type: 'certificate'
    }, {
        text: '监护人姓名',
        value: 'guardName',
        validate: true,
        type: 'string'
    }, {
        text: '监护人联系方式',
        value: 'guardCon',
        validate: true,
        type: 'mobile'
    }, {
        text: '初次发病日期',
        value: 'firstDate',
        validate: false,
        type: 'date'
    }, {
        text: '目前诊断类型',
        value: 'diaStyle',
        validate: true,
        type: 'radio',
        dictionary: 'MQZDLX',
        valueName: '',
        options: []
    }, {
        text: '有无肇事肇祸史',
        value: 'accident',
        validate: true,
        type: 'radio',
        dictionary: 'sfzdgzry',
        valueName: '',
        options: []
    }, {
        text: '肇事肇祸次数',
        value: 'accNum',
        validate: false,
        type: 'string'
    }, {
        text: '上次肇事肇祸日期',
        value: 'accDate',
        validate: false,
        type: 'date'
    }, {
        text: '目前危险性评估等级',
        value: 'danLevel',
        validate: true,
        type: 'radio',
        dictionary: 'MQWXXPGDJ',
        valueName: '',
        options: []
    }, {
        text: '治疗情况',
        value: 'treatSit',
        validate: true,
        type: 'radio',
        dictionary: 'ZLQK',
        valueName: '',
        options: []
    }, {
        text: '治疗医院名称',
        value: 'hosName',
        validate: false,
        type: 'string'
    }, {
        text: '实施住院治疗原因',
        value: 'hosReason',
        validate: false,
        type: 'checkbox',
        dictionary: 'SSZYZLYY',
        valueName: '',
        options: []
    }, {
        text: '接收康复训练机构名称',
        value: 'recName',
        validate: false,
        type: 'string'
    }, {
        text: '帮扶情况',
        value: 'helpSit',
        validate: false,
        type: 'checkbox',
        dictionary: 'BFQK',
        valueName: '',
        options: []
    }, {
        text: '参与管理人员',
        value: 'manager',
        validate: false,
        type: 'checkbox',
        dictionary: 'CYGLRY',
        valueName: '',
        options: []
    }, {
        text: '关注程度',
        value: 'followDegree',
        validate: false,
        type: 'radio',
        dictionary: 'GZCD',
        valueName: '',
        options: []
    }, {
        text: '关联地图',
        value: 'coordinate',
        validate: true,
        type: 'adressMark'
    }]
};

// 邪教人员配置
var cult = {
    f: {
        // 邪教人员主键	String
        id: '',
        // 行政区划编号	String
        dataAreaCode: '',
        // 证件号码	String
        idNum: '',
        // 姓名	String
        name: '',
        // 性别	String
        sex: '',
        //	出生日期	String
        date: '',
        // 民族	String
        nation: '',
        // 单位或家庭住址	String
        residence: '',
        // 直接责任人姓名	String
        directName: '',
        // 直接责任人单位及职务	String
        directUnit: '',
        // 具体责任人姓名	String
        specialName: '',
        // 具体责任人单位及职务	String
        specialUnit: '',
        // 联系电话	String
        contact: '',
        // 思想状况	String
        mentality: '',
        // 是否重点人员	String
        isEmphases: '',
        // 人员类别	String
        type: '',
        // 关注程度	String
        followDegree: '',
        // 关联地图
        coordinate: ''
    },
    show: [{
        text: '证件号码',
        value: 'idNum',
        validate: true,
        type: 'certificate'
    }, {
        text: '姓名',
        value: 'name',
        validate: true,
        type: 'string'
    }, {
        text: '性别',
        value: 'sex',
        validate: true,
        type: 'radio',
        dictionary: 'gentles',
        valueName: '',
        options: []
    }, {
        text: '出生日期',
        value: 'date',
        validate: false,
        type: 'date'
    }, {
        text: '民族',
        value: 'nation',
        validate: false,
        type: 'radio',
        dictionary: 'familyname',
        valueName: '',
        options: []
    }, {
        text: '单位或家庭地址',
        value: 'residence',
        validate: false,
        type: 'string'
    }, {
        text: '直接责任人',
        value: 'directName',
        validate: false,
        type: 'string'
    }, {
        text: '直接责任人单位及职务',
        value: 'directUnit',
        validate: false,
        type: 'string'
    }, {
        text: '具体责任人姓名',
        value: 'specialName',
        validate: false,
        type: 'string'
    }, {
        text: '具体责任人单位及职务',
        value: 'specialUnit',
        validate: false,
        type: 'string'
    }, {
        text: '思想状况',
        value: 'mentality',
        validate: false,
        type: 'string'
    }, {
        text: '联系电话',
        value: 'contact',
        validate: false,
        type: 'mobile'
    }, {
        text: '是否重点人员',
        value: 'isEmphases',
        validate: true,
        type: 'radio',
        dictionary: 'sfzdgzry',
        valueName: '',
        options: []
    }, {
        text: '人员类别',
        value: 'type',
        validate: false,
        type: 'radio',
        dictionary: 'xjryfl',
        valueName: '',
        options: []
    }, {
        text: '关注程度',
        value: 'followDegree',
        validate: false,
        type: 'radio',
        dictionary: 'DegreeConcern',
        valueName: '',
        options: []
    }, {
        text: '关联地图',
        value: 'coordinate',
        validate: true,
        type: 'adressMark'
    }]
}

// 法轮功人员帮扶记录配置
var cultHelper = {
    f: {
        // 帮扶记录主键	String
        id: '',
        // 特殊人员主键	String
        spId: '',
        // 帮扶人员主键（移动端即当前用户accountId）	String
        helperId: '',
        // 帮扶年月	String
        time: '',
        // 帮扶内容	String
        content: '',
        // 随行人员	String
        followers: '',
        // 帮扶人员姓名	String
        helper: '',
        // 是否愿意接受帮扶教育	String
        isReceiveEducation: '',
        // 有无诬告滥诉	String
        isGathering: '',
        // 有无传播邪教信息	String
        isDisseminateCultInfo: '',
        //思想转化效果
        thoughtTransfor: '',
        //	邻里评价	String
        neighborEval: '',
        // 综合评价	String
        overallEval: '',
        //	附件Id	String
        attachId: ''
    },
    show: [{
        text: '网格员',
        value: 'helper',
        validate: true,
        type: 'string'
    }, {
        text: '随行人员',
        value: 'followers',
        validate: false,
        type: 'string'
    }, {
        text: '走访时间',
        value: 'time',
        validate: true,
        type: 'yearMonth'
    }, {
        text: '是否愿意接受帮扶教育',
        value: 'isReceiveEducation',
        validate: true,
        type: 'radio',
        dictionary: 'sfzdgzry',
        valueName: '',
        options: []
    }, {
        text: '有无诬告滥诉',
        value: 'isGathering',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "有",
            status: 'normal',
            key: 1
        }, {
            text: "无",
            status: 'normal',
            key: 2
        }]
    }, {
        text: '有无传播邪教信息',
        value: 'isDisseminateCultInfo',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "有",
            status: 'normal',
            key: 1
        }, {
            text: "无",
            status: 'normal',
            key: 2
        }]
    }, {
        text: '思想转化效果',
        value: 'thoughtTransfor',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "好",
            status: 'normal',
            key: 1
        }, {
            text: "一般",
            status: 'normal',
            key: 2
        }, {
            text: "差",
            status: 'normal',
            key: 3
        }]
    }, {
        text: '邻里评价',
        value: 'neighborEval',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "好",
            status: 'normal',
            key: 1
        }, {
            text: "一般",
            status: 'normal',
            key: 2
        }, {
            text: "差",
            status: 'normal',
            key: 3
        }]
    }, {
        text: '综合评价',
        value: 'overallEval',
        validate: true,
        type: 'radio',
        dictionary: 'score',
        valueName: '',
        options: []
    }, {
        text: '其它现实表现',
        value: 'content',
        validate: true,
        type: 'string'
    }]
}

//吸毒人员帮扶记录配置
var drugHelper = {
    f: {
        // 帮扶记录主键	String
        id: '',
        // 特殊人员主键	String
        spId: '',
        // 帮扶人员主键（移动端即当前用户accountId）	String
        helperId: '',
        // 帮扶地点	String
        place: '',
        // 帮扶年月	String
        time: '',
        // 帮扶内容	String
        content: '',
        // 随行人员	String
        followers: '',
        // 帮扶人员姓名	String
        helper: '',
        // 对社区戒毒社区康复的认识	String
        denialDetection: '',
        // 遵守协议情况String
        leaveCenter: '',
        //接受吸毒检测情况
        drugAbuse: '',
        // 接受教育、劝诫情况String
        educationInform: '',
        // 遵守请销假情况String
        leavelInform: '',
        //报告戒毒康复情况
        drugRehabilitation: '',
        // 参加就业技能培训
        skill: '',
        // 婚姻家庭关系String
        marryRelationship: '',
        // 交友状况String
        friendRelationship: '',
        // 邻里关系String
        neighBourhood: '',
        // 经济来源String
        economicSource: '',
        // 住房条件String
        houseConditions: '',
        // 就业能力String
        employability: '',
        // 心理健康状况
        mentalHealth: '',

        //	邻里评价	String
        neighborEval: '',
        // 综合评价	String
        overallEval: '',
        //	附件Id	String
        attachId: ''
    },
    show: [{
        text: '网格员',
        value: 'helper',
        validate: true,
        type: 'string'
    }, {
        text: '随行人员',
        value: 'followers',
        validate: false,
        type: 'string'
    }, {
        text: '走访时间',
        value: 'time',
        validate: true,
        type: 'yearMonth'
    }, {
        text: '帮扶地点',
        value: 'place',
        validate: true,
        type: 'string'
    }, {
        text: '对社区戒毒社区康复的认识',
        value: 'denialDetection',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "认识正确，积极接受",
            status: 'normal',
            key: 5
        }, {
            text: "认识模糊，有一定抵触",
            status: 'normal',
            key: 3
        }, {
            text: "缺乏认识，拒绝接受",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '遵守协议情况',
        value: 'leaveCenter',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "严格遵守",
            status: 'normal',
            key: 5
        }, {
            text: "消极应付，经教育能改正",
            status: 'normal',
            key: 3
        }, {
            text: "偶尔违反，经教育不改正",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '接受吸毒检测情况',
        value: 'drugAbuse',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "积极接受，态度认真",
            status: 'normal',
            key: 5
        }, {
            text: "一般，经教育能改正",
            status: 'normal',
            key: 3
        }, {
            text: "拒绝接受",
            status: 'normal',
            key: 0
        }
        ]
    }, {
        text: '接受教育、劝诫情况',
        value: 'educationInform',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "积极接受，态度认真",
            status: 'normal',
            key: 5
        }, {
            text: "一般，经教育能改正",
            status: 'normal',
            key: 3
        }, {
            text: "消极应付，经教育不改正",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '遵守请销假情况',
        value: 'leavelInform',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "严格遵守",
            status: 'normal',
            key: 3
        }, {
            text: "消极应付，经教育能改正",
            status: 'normal',
            key: 2
        }, {
            text: "偶尔违反，经教育不改正",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '报告戒毒康复情况',
        value: 'drugRehabilitation',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "按规定认真完成，善于接受规劝",
            status: 'normal',
            key: 3
        }, {
            text: "应付完成或很难接受规劝",
            status: 'normal',
            key: 2
        }, {
            text: "基本未完成",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '参加就业技能培训',
        value: 'skill',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "积极参加或无需参加培训",
            status: 'normal',
            key: 3
        }, {
            text: "被动参加且未完成培训计划",
            status: 'normal',
            key: 2
        }, {
            text: "不愿参加培训",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '婚姻家庭关系',
        value: 'marryRelationship',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "和睦稳定",
            status: 'normal',
            key: 3
        }, {
            text: "轻微冲突",
            status: 'normal',
            key: 2
        }, {
            text: "重大冲突、纠纷或无亲属",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '交友状况',
        value: 'friendRelationship',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "社交健康、正常",
            status: 'normal',
            key: 3
        }, {
            text: "比较孤立无朋友",
            status: 'normal',
            key: 2
        }, {
            text: "与不良人有交往",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '邻里关系',
        value: 'neighBourhood',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "和睦、友善",
            status: 'normal',
            key: 3
        }, {
            text: "较为淡漠",
            status: 'normal',
            key: 2
        }, {
            text: "紧张、存在冲突",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '经济来源',
        value: 'economicSource',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "正常就业收入",
            status: 'normal',
            key: 3
        }, {
            text: "低保救助或家庭资助",
            status: 'normal',
            key: 2
        }, {
            text: "无稳定经济来源",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '住房条件',
        value: 'houseConditions',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "有独立居所",
            status: 'normal',
            key: 3
        }, {
            text: "有居住地但不独立",
            status: 'normal',
            key: 2
        }, {
            text: "居无定所",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '就业能力',
        value: 'employability',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "较强，竞争上岗或自主择就业",
            status: 'normal',
            key: 3
        }, {
            text: "一般，推荐上岗或过渡性就业",
            status: 'normal',
            key: 2
        }, {
            text: "弱，无法就业",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '心理健康状况',
        value: 'mentalHealth',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "心理健康状况良好",
            status: 'normal',
            key: 3
        }, {
            text: "心理健康状况一般",
            status: 'normal',
            key: 2
        }, {
            text: "心理健康状况差",
            status: 'normal',
            key: 0
        }]
    }, {
        text: '综合评价',
        value: 'overallEval',
        validate: false,
        type: 'string'
    }, {
        text: '其它现实表现',
        value: 'content',
        validate: true,
        type: 'string'
    }]
}

// 重点监控人员帮扶记录配置
var keyMonitorHelper = {
    f: {
        // 帮扶记录主键	String
        id: '',
        // 特殊人员主键	String
        spId: '',
        // 帮扶人员主键（移动端即当前用户accountId）	String
        helperId: '',
        // 帮扶地点	String
        place: '',
        // 帮扶年月	String
        time: '',
        // 帮扶内容	String
        content: '',
        // 随行人员	String
        followers: '',
        // 帮扶人员姓名	String
        helper: '',
        // 有无故意上访行为	String
        isDeliberatePetition: '',
        // 有无存在心理障碍	String
        isPsychologicalBarry: '',
        //	邻里评价	String
        neighborEval: '',
        // 综合评价	String
        overallEval: '',
        //	附件Id	String
        attachId: ''
    },
    show: [{
        text: '网格员',
        value: 'helper',
        validate: true,
        type: 'string'
    }, {
        text: '随行人员',
        value: 'followers',
        validate: false,
        type: 'string'
    }, {
        text: '走访时间',
        value: 'time',
        validate: true,
        type: 'dateDay'
    }, {
        text: '帮扶地点',
        value: 'place',
        validate: true,
        type: 'string'
    }, {
        text: '近期动态',
        value: 'recentDevelopmemts',
        validate: true,
        type: 'string'
    }, {
        text: '近期状态',
        value: 'recentState',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [
            {
                text: "稳定",
                status: 'normal',
                key: 1
            }, {
                text: "不稳定",
                status: 'normal',
                key: 2
            }
        ]
    }, {
        text: '下步工作建议',
        value: 'nextStep',
        validate: true,
        type: 'string'
    }, {
        text: '综合评价',
        value: 'overallEval',
        validate: true,
        type: 'radio',
        dictionary: 'score',
        valueName: '',
        options: []
    }, {
        text: '其它现实表现',
        value: 'content',
        validate: true,
        type: 'string'
    }]
}

// 精神障碍人员
var mentalDisorderHelper = {
    f: {
        // 帮扶记录主键	String
        id: '',
        // 特殊人员主键	String
        spId: '',
        // 帮扶人员主键（移动端即当前用户accountId）	String
        helperId: '',
        // 	帮扶地点	String
        place: '',
        // 	帮扶年月	String
        time: '',
        // 	帮扶内容	String
        content: '',
        // 	随行人员	String
        followers: '',
        // 帮扶人员姓名	String
        helper: '',
        // 有无肇事肇祸行为	String
        isPsychoService: '',
        // 危险性评估	String
        isJoinActivity: '',
        // 危险因素	String
        riskFactors: '',
        // 	服药情况	String
        medication: '',
        // 	患者状态	String
        patientStatus: '',
        // 入院时间	String
        admissionTime: '',
        // 出院时间	String
        dischargeTime: '',
        // 医疗机构名称	String
        medicalName: '',
        // 失踪时间	String
        displayTime: '',
        // 是否向当地公安机关、综治部门、卫生计生部门、民政部门通报情况	String
        istimeOut: '',
        // 去向是否明确	String
        isTrue: '',
        // 有无开展心理健康辅导	String
        isHealth: '',
        // 有无积极参加社区组织的康复活动	String
        isCommunity: '',
        // 邻里评价	String
        neighborEval: '',
        // 综合评价	String
        overallEval: '',
        // 	附件Id	String
        attachId: ''
    },
    show: [{
        text: '网格员',
        value: 'helper',
        validate: true,
        type: 'string'
    }, {
        text: '随行人员',
        value: 'followers',
        validate: false,
        type: 'string'
    }, {
        text: '走访时间',
        value: 'time',
        validate: true,
        type: 'yearMonth'
    }, {
        text: '帮扶地点',
        value: 'place',
        validate: true,
        type: 'string'
    }, {
        text: '有无肇事肇祸行为',
        value: 'isPsychoService',
        validate: false,
        type: 'checkbox',
        dictionary: '',
        valueName: '',
        options: [{
            text: "有肇事行为",
            status: 'normal',
            key: 1
        }, {
            text: "有肇祸行为",
            status: 'normal',
            key: 2
        }, {
            text: "轻度滋事",
            status: 'normal',
            key: 3
        }]
    }, {
        text: '危险性评估',
        value: 'isJoinActivity',
        validate: false,
        type: 'checkbox',
        dictionary: '',
        valueName: '',
        options: [{
            text: "口头威胁，喊叫，但没有打砸行为",
            status: 'normal',
            key: 5
        }, {
            text: "打砸行为，局限在家里，针对财物，能被劝说制止 ",
            status: 'normal',
            key: 4
        }, {
            text: "明显打砸行为，不分场合，针对财物，不能接受劝说而停止",
            status: 'normal',
            key: 3
        }, {
            text: "持续的打砸行为，不分场合，针对财物或人，不能接受劝说而停止，包括自伤、自杀止",
            status: 'normal',
            key: 2
        }, {
            text: " 持械针对人的任何暴力行为，或者纵火、爆炸等行为，无论在家里还是公共场合",
            status: 'normal',
            key: 1
        }]
    }, {
        text: '危险因素',
        value: 'riskFactors',
        validate: false,
        type: 'checkbox',
        dictionary: '',
        valueName: '',
        options: [{
            text: "患者监护较差，尤其是无监护或弱监护患者",
            status: 'normal',
            key: 1
        }, {
            text: "既往出现暴力行为",
            status: 'normal',
            key: 2
        }, {
            text: "既往有暴力冲动的口头威胁",
            status: 'normal',
            key: 3
        }, {
            text: "近3个月内有被害妄想、猜疑等精神病性症状",
            status: 'normal',
            key: 4
        }, {
            text: "有酒精、毒品等精神活性物质史",
            status: 'normal',
            key: 5
        }, {
            text: "抗精神病药物治疗依从性较低",
            status: 'normal',
            key: 6
        }, {
            text: "人格障碍（冲动、边缘、偏执型人格），不易沟通交流",
            status: 'normal',
            key: 7
        }, {
            text: "经历重大事件刺激或变故，经常被周边人员嘲笑或挑逗等",
            status: 'normal',
            key: 8
        }]
    }, {
        text: '服药情况',
        value: 'medication',
        validate: false,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [
            {
                text: "不服药",
                status: 'normal',
                key: 1
            }, {
                text: "服药",
                status: 'normal',
                key: 2
            }, {
                text: "规律服药",
                status: 'normal',
                key: 3
            }
        ]
    }, {
        text: '患者状态',
        value: 'patientStatus',
        validate: true,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [{
            text: "==请选择== ",
            status: 'normal',
            key: ''
        }, {
            text: "居家",
            status: 'normal',
            key: 1
        }, {
            text: "住院",
            status: 'normal',
            key: 2
        }, {
            text: "失踪",
            status: 'normal',
            key: 3
        }]
    }, {
        text: '入院时间',
        value: 'admissionTime',
        optionsId: 2,
        optionsValue: 'patientStatus',
        validate: false,
        type: 'date'
    }, {
        text: '出院时间',
        value: 'dischargeTime',
        optionsId: 2,
        optionsValue: 'patientStatus',
        validate: false,
        type: 'date'
    }, {
        text: '医疗机构名称',
        value: 'medicalName',
        optionsId: 2,
        optionsValue: 'patientStatus',
        validate: false,
        type: 'string'
    }, {
        text: '失踪时间',
        value: 'displayTime',
        optionsId: 3,
        optionsValue: 'patientStatus',
        validate: false,
        type: 'date'
    }, {
        text: '是否向当地公安机关、综治部门、卫生计生部门、民政部门通报情况',
        value: 'istimeOut',
        validate: false,
        type: 'radio',
        optionsId: 3,
        optionsValue: 'patientStatus',
        dictionary: 'sfzdgzry',
        valueName: '',
        options: []
    }, {
        text: '去向是否明确',
        value: 'isTrue',
        validate: false,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [
            {
                text: "是",
                status: 'normal',
                key: 0
            }, {
                text: "否",
                status: 'normal',
                key: 1
            }]
    }, {
        text: '有无开展心理健康辅导',
        value: 'isHealth',
        validate: false,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [
            {
                text: "有",
                status: 'normal',
                key: 0
            }, {
                text: "无",
                status: 'normal',
                key: 1
            }]
    }, {
        text: '有无积极参加社区组织的康复活动',
        value: 'isCommunity',
        validate: false,
        type: 'radio',
        dictionary: '',
        valueName: '',
        options: [
            {
                text: "有",
                status: 'normal',
                key: 0
            }, {
                text: "无",
                status: 'normal',
                key: 1
            }]
    }, {
        text: '综合评价',
        value: 'overallEval',
        validate: true,
        type: 'radio',
        dictionary: 'score',
        valueName: '',
        options: []
    }, {
        text: '其它现实表现',
        value: 'content',
        validate: true,
        type: 'string'
    }
    ]
}
