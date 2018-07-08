module.exports = {
  /**
   * 视频上传地址
   * @type string
   */
  url: "http://member.bilibili.com/video/upload.html",

  /**
   * 是否为调试模式
   * @type boolean
   */
  debug: false,

  /**
   * 三项关键cookies
   * @type string
   */
  bili_jct: "",
  SESSDATA: "",
  DedeUserID: "",

  /**
   * 上传视频的本地地址
   */
  video: [""],
  /**
   * 是否使用自动生成的封面
   * 暂时不可用
   * @type boolean
   */
  autogen: false,
  /**
   * 使用自动生成的第几张封面
   * @type int
   */
  select: 1, // 1-4
  /**
   * 上传封面的本地地址
   * @type string
   */
  cover: "",

  /**
   * 投稿标题
   * @type string
   */
  title: "",
  /**
   * 投稿类型
   * @type int
   * 0 = 原创，1 = 转载
   */
  type: 0,
  /**
   * 转载地址
   * @type string
   */
  from: "",
  /**
   * 分类类别
   * @type Array<int>
   *
   * category[0]代表主分区信息，下为详细列表：
   *  0 = 游戏
   *  1 = 生活
   *  2 = 娱乐
   *  3 = 影视
   *  4 = 音乐
   *  5 = 科技
   *  6 = 动画
   *  7 = 时尚
   *  8 = 舞蹈
   *  9 = 番剧
   *  10 = 纪录片
   *  11 = 鬼畜
   *  12 = 广告
   *  13 = 国创
   *  14 = 电视剧
   *  15 = 电影
   *
   * category[1]代表子分区信息，按照官方分区列表从上到下，下列出游戏区的详细列表：
   *  0 = 单机联机
   *  1 = Mugen
   *  2 = 网络游戏
   *  3 = GMV
   *  4 = 音游
   *  5 = 电子竞技
   *  6 = 手机游戏
   *  7 = 桌游棋牌
   */
  category: [0, 0],
  /**
   * 视频标签
   * @type Array<string>
   */
  tags: [""],
  /**
   * 视频简介（可带\n）
   * @type string
   */
  description: "",

  /**
   * 是否含商业推广信息
   * @type boolean
   */
  commercial: false,

  /**
   * 动态消息（可带#话题#，\n等）
   * @type string
   */
  dynamic: ""
};
