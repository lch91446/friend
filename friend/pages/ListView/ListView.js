//index.js
//获取应用实例
var app = getApp()
var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    goodsList: [{ "barCode": "", "categoryId": 2246, "characteristic": "尼多熊袜子，适合秋冬", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:51:08", "dateStart": "2017-10-30 10:44:34", "dateUpdate": "2018-06-30 13:48:44", "id": 6765, "logisticsId": 386, "minPrice": 80.00, "minScore": 0, "name": "1-3岁袜子", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/b07ee85fa64f0c68aa9a45fba20ec689.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 700000, "userId": 951, "videoId": "c4c6e38eeb3a428e80f1a8b32c6de587", "views": 33809, "weight": 0.00 }, { "barCode": "", "categoryId": 2246, "characteristic": "尼多熊袜子，适合秋冬天", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:44:23", "dateStart": "2017-10-30 10:39:02", "dateUpdate": "2018-06-30 13:25:29", "id": 6761, "logisticsId": 386, "minPrice": 90.00, "minScore": 0, "name": "10-12岁袜子", "numberFav": 0, "numberGoodReputation": 8, "numberOrders": 12, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/bc15e96f20fb13cc7d35f90d743ccb17.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 9999988, "userId": 951, "videoId": "", "views": 18676, "weight": 0.00 }, { "barCode": "", "categoryId": 2246, "characteristic": "尼多熊袜子，适合秋冬天", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:44:16", "dateStart": "2017-10-30 10:39:02", "dateUpdate": "2018-06-30 13:05:33", "id": 6760, "logisticsId": 386, "minPrice": 90.00, "minScore": 0, "name": "10-12岁袜子", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/bc15e96f20fb13cc7d35f90d743ccb17.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 10, "userId": 951, "views": 6513, "weight": 0.00 }, { "barCode": "", "categoryId": 2246, "characteristic": "尼多熊袜子，适合3-5岁宝宝", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:36:44", "dateStart": "2017-10-30 10:34:01", "dateUpdate": "2018-06-30 13:39:02", "id": 6748, "logisticsId": 386, "minPrice": 85.00, "minScore": 0, "name": "3-5岁可爱袜子", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 1, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/706ce9a593eafa29f2ded527553dbec9.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 9, "userId": 951, "views": 6654, "weight": 0.00 }, { "barCode": "", "categoryId": 2246, "characteristic": "纯色袜子，适合5-7岁宝宝", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:33:41", "dateStart": "2017-10-30 10:31:37", "dateUpdate": "2018-06-30 13:24:35", "id": 6747, "logisticsId": 386, "minPrice": 85.00, "minScore": 0, "name": "5-7岁袜子", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/cc9fd5d1d2ed58ab963561ab1fa39f89.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 0, "userId": 951, "views": 2701, "weight": 0.00 }, { "barCode": "", "categoryId": 2246, "characteristic": "纯色袜子，适合5-7岁宝宝", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:33:36", "dateStart": "2017-10-30 10:31:37", "dateUpdate": "2018-06-30 10:58:12", "id": 6746, "logisticsId": 386, "minPrice": 85.00, "minScore": 0, "name": "5-7岁袜子", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/cc9fd5d1d2ed58ab963561ab1fa39f89.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 0, "userId": 951, "views": 2891, "weight": 0.00 }, { "barCode": "", "categoryId": 1872, "characteristic": "尼多熊袜子，适合秋冬天", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-30 10:31:27", "dateStart": "2017-10-30 10:24:54", "dateUpdate": "2018-06-30 13:08:14", "id": 6745, "logisticsId": 386, "minPrice": 90.00, "minScore": 0, "name": "10-12岁袜子", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 2, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/30/94ed2ab19dc0ed01e65ac2fbd9e87147.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 8, "userId": 951, "views": 4564, "weight": 0.00 }, { "barCode": "", "categoryId": 2787, "characteristic": "保暖雨鞋", "commission": 5.00, "commissionType": 2, "dateAdd": "2017-10-18 11:18:11", "dateStart": "2017-10-18 11:15:57", "dateUpdate": "2018-06-30 10:46:10", "id": 5781, "logisticsId": 386, "minPrice": 45.00, "minScore": 3, "name": "雨鞋", "numberFav": 0, "numberGoodReputation": 2, "numberOrders": 2, "originalPrice": 0.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/10/13/2d52b35375e8f0f13990e1443ebdaeed.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 9999999, "userId": 951, "videoId": "", "views": 3856, "weight": 0.00 }, { "categoryId": 2246, "characteristic": "拼色打底袜", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-25 09:26:09", "dateStart": "2017-09-25 09:22:26", "dateUpdate": "2018-06-30 02:12:03", "id": 4517, "logisticsId": 459, "minPrice": 12.00, "minScore": 0, "name": "可爱拼色打底袜", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 1, "originalPrice": 25.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/3e87985e0f2f34db607ad5658bd57e18.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 3274, "weight": 0.00 }, { "categoryId": 2246, "characteristic": "可开档的小童打底袜，中童尺码也有，小童6个月到24个月，中童4岁到8岁", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-25 09:19:24", "dateStart": "2017-09-25 09:15:10", "dateUpdate": "2018-06-30 11:14:09", "id": 4512, "logisticsId": 459, "minPrice": 20.00, "minScore": 0, "name": "打底袜", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 30.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/a3ec4d35dea62ad4de39a786b6d11393.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 2794, "weight": 0.00 }, { "categoryId": 2246, "characteristic": "可爱打底袜", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-25 09:14:55", "dateStart": "2017-09-25 09:10:58", "dateUpdate": "2018-06-30 11:11:46", "id": 4510, "logisticsId": 459, "minPrice": 12.00, "minScore": 0, "name": "可爱打底袜", "numberFav": 0, "numberGoodReputation": 2, "numberOrders": 2, "originalPrice": 25.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/2bc18370e8ed865d34371fe3e80f8dd7.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 2134, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "中小童毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 09:47:58", "dateStart": "2017-09-24 09:43:08", "dateUpdate": "2018-06-30 13:30:14", "id": 4470, "logisticsId": 386, "minPrice": 49.00, "minScore": 0, "name": "毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 3, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/2b17c4d23cb83824eb4362052831ab8e.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 4151, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "小狗图案毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 09:40:52", "dateStart": "2017-09-24 09:33:38", "dateUpdate": "2018-06-30 13:08:19", "id": 4469, "logisticsId": 386, "minPrice": 49.00, "minScore": 0, "name": "小狗图案毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/0b9a26c787908ff4ea98c58056a90736.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 2960, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "小童毛衣背心", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 09:31:59", "dateStart": "2017-09-24 09:24:49", "dateUpdate": "2018-06-30 11:13:33", "id": 4468, "logisticsId": 386, "minPrice": 49.00, "minScore": 0, "name": "毛衣背心", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/f677962d23a374576c837730a60d1a0b.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 2641, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "小童爆款马甲，这个天气刚刚好穿", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 09:23:34", "dateStart": "2017-09-24 09:14:00", "dateUpdate": "2018-06-30 10:23:54", "id": 4467, "logisticsId": 386, "minPrice": 49.00, "minScore": 0, "name": "爆款背心", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/6a4edc9261c8042e9caf6fb82e0ccf37.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 1363, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "多色可选的马甲", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 09:12:20", "dateStart": "2017-09-24 08:55:13", "dateUpdate": "2018-06-30 12:03:10", "id": 4466, "logisticsId": 386, "minPrice": 49.00, "minScore": 0, "name": "马甲", "numberFav": 0, "numberGoodReputation": 2, "numberOrders": 2, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/45d3f6f9bd2ad159b7860f307f158456.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 2973, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "可爱毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 08:53:48", "dateStart": "2017-09-24 08:48:14", "dateUpdate": "2018-06-30 13:08:25", "id": 4464, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "毛衣", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/8ef3567c8ab7073843577cd8f866cabf.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 100, "userId": 951, "views": 1070, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "女孩子喜欢的圈圈毛衣，加绒", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-24 08:41:37", "dateStart": "2017-09-24 08:35:52", "dateUpdate": "2018-06-29 12:40:40", "id": 4463, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/23/51555eb514558df4ec7b5beb3e33b463.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 50, "userId": 951, "views": 1234, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "加绒毛衣，性价比高", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-22 16:10:49", "dateStart": "2017-09-22 16:06:03", "dateUpdate": "2018-06-30 01:11:21", "id": 4411, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "加绒毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/21/a580f88b6a9393d3e8f1e6dbc056e297.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 50, "userId": 951, "views": 820, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "加绒毛衣，中大童", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-22 16:05:19", "dateStart": "2017-09-22 16:00:25", "dateUpdate": "2018-06-29 19:15:25", "id": 4410, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "加绒毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/21/91d7bcf6e72eba3df144c997971d50f5.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 50, "userId": 951, "views": 885, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "加绒毛衣，纯棉加绒款", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-22 15:59:55", "dateStart": "2017-09-22 15:54:02", "dateUpdate": "2018-06-29 11:09:15", "id": 4409, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "加绒毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/21/47ef63262a88b4a7bc511f73fe630f91.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 50, "userId": 951, "views": 617, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "加绒毛衣，不久的北方就要穿到了", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-22 15:48:29", "dateStart": "2017-09-22 15:42:40", "dateUpdate": "2018-06-30 10:36:08", "id": 4407, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "加绒毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 89.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/21/b488cca695006310151639f97f21a871.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 50, "userId": 951, "views": 714, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "高品质的夹克外套", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-22 15:37:51", "dateStart": "2017-09-22 15:33:20", "dateUpdate": "2018-06-28 17:52:14", "id": 4402, "logisticsId": 386, "minPrice": 159.00, "minScore": 0, "name": "夹克外套", "numberFav": 0, "numberGoodReputation": 2, "numberOrders": 2, "originalPrice": 189.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/21/cff002e71c93ba89e205000d6780597c.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 715, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "貂绒毛衣，男孩女孩都适合", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-22 14:58:09", "dateStart": "2017-09-22 14:41:04", "dateUpdate": "2018-06-28 21:03:18", "id": 4391, "logisticsId": 386, "minPrice": 139.00, "minScore": 0, "name": "貂绒毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 189.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/21/3c1a547a13282d3d638388e2de317ee2.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 790, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "男童风衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-20 09:58:09", "dateStart": "2017-09-20 09:49:40", "dateUpdate": "2018-06-30 01:11:28", "id": 4234, "logisticsId": 386, "minPrice": 179.00, "minScore": 0, "name": "风衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 189.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/20/965c26bccd4b89017690f2bb9c355812.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 748, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "兔毛，手感好，质量更好", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-20 08:18:55", "dateStart": "2017-09-20 08:14:37", "dateUpdate": "2018-06-30 10:52:05", "id": 4232, "logisticsId": 386, "minPrice": 189.00, "minScore": 0, "name": "兔毛马甲", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 189.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/20/75f0d16745da1773a9a8ea048e3d128b.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 10, "userId": 951, "views": 645, "weight": 0.00 }, { "categoryId": 1907, "characteristic": "", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-20 06:07:40", "dateStart": "2017-09-20 05:52:00", "dateUpdate": "2018-06-28 21:48:13", "id": 4231, "logisticsId": 0, "minPrice": 169.00, "minScore": 0, "name": "休闲套装", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 189.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/4173c20606f32b874e3ad4ffa53e708c.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 5, "userId": 951, "views": 691, "weight": 0.00 }, { "categoryId": 1907, "characteristic": "", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-20 05:40:45", "dateStart": "2017-09-20 05:37:01", "dateUpdate": "2018-06-29 11:58:50", "id": 4230, "logisticsId": 386, "minPrice": 169.00, "minScore": 0, "name": "休闲套装", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 189.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/4e7f2a42522b315442665c177c652268.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 5, "userId": 951, "views": 607, "weight": 0.00 }, { "categoryId": 1906, "characteristic": "秋款背心裙", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-20 05:33:09", "dateStart": "2017-09-20 05:24:26", "dateUpdate": "2018-06-28 21:47:39", "id": 4229, "logisticsId": 386, "minPrice": 119.00, "minScore": 0, "name": "背心裙", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/e3fbc8dda7d9c84f6c92bb8f3a1ee225.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 5, "userId": 951, "views": 684, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-20 05:05:00", "dateStart": "2017-09-20 05:02:58", "dateUpdate": "2018-06-30 10:31:11", "id": 4228, "logisticsId": 386, "minPrice": 69.00, "minScore": 0, "name": "新款毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/511bfa119fdc922255b33c5d6c0a1693.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 5, "userId": 951, "views": 530, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "男女宝宝通穿的加绒卫衣，含羊绒", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 05:48:58", "dateStart": "2017-09-19 05:38:39", "dateUpdate": "2018-06-30 10:47:36", "id": 4189, "logisticsId": 386, "minPrice": 139.00, "minScore": 0, "name": "羊绒卫衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/3d785c3879a0c3aa2b8b864f691c3730.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 823, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "个性马甲", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 05:10:06", "dateStart": "2017-09-19 04:57:14", "dateUpdate": "2018-06-30 10:31:21", "id": 4188, "logisticsId": 386, "minPrice": 139.00, "minScore": 0, "name": "马甲", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/1d2d3df9289fd411c00ab17b07ecec94.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 437, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "最实用的背心", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:47:39", "dateStart": "2017-09-19 04:45:04", "dateUpdate": "2018-06-29 12:25:45", "id": 4187, "logisticsId": 386, "minPrice": 59.00, "minScore": 0, "name": "背心", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/92b79640b3c2c2bfdf1cb972c1d95992.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 370, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "简单款粗线毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:44:57", "dateStart": "2017-09-19 04:42:40", "dateUpdate": "2018-06-30 13:30:29", "id": 4186, "logisticsId": 386, "minPrice": 75.00, "minScore": 0, "name": "粗线毛衣", "numberFav": 0, "numberGoodReputation": 2, "numberOrders": 2, "originalPrice": 129.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/f4cf6ac8f9eabb9fb84ca052f4e94021.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 419, "weight": 0.00 }, { "categoryId": 1873, "characteristic": "新款加绒假两件裤子", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:42:28", "dateStart": "2017-09-19 04:40:08", "dateUpdate": "2018-06-30 11:51:49", "id": 4185, "logisticsId": 386, "minPrice": 75.00, "minScore": 0, "name": "加绒裤子", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/37f0da2ee31cad498ba810aa14b9d14a.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 1716, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "高领毛衣到货", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:39:45", "dateStart": "2017-09-19 04:37:59", "dateUpdate": "2018-06-29 12:25:38", "id": 4184, "logisticsId": 386, "minPrice": 79.00, "minScore": 0, "name": "高领毛衣到货", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/8314a69d230fb96bf826412280ecf84c.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 485, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "黑白条纹上衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:37:50", "dateStart": "2017-09-19 04:24:01", "dateUpdate": "2018-06-29 15:15:27", "id": 4183, "logisticsId": 386, "minPrice": 75.00, "minScore": 0, "name": "黑白条纹上衣", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/6b6d31989e1300c89ac4f2ebb734bb67.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 396, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "苦等的外套到货啦", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:23:47", "dateStart": "2017-09-19 04:17:29", "dateUpdate": "2018-06-30 10:15:48", "id": 4182, "logisticsId": 386, "minPrice": 129.00, "minScore": 0, "name": "外套", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/80c2dcf6d85ec7fd1289f374d21f9266.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 410, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "为数不多的小鸟衬衫", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:14:07", "dateStart": "2017-09-19 04:11:40", "dateUpdate": "2018-06-29 09:07:01", "id": 4181, "logisticsId": 386, "minPrice": 75.00, "minScore": 0, "name": "小鸟衬衫", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/2a2bdb8997ab7ce41a9673540faa799a.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 360, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "带少量羊绒的条纹毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 04:05:37", "dateStart": "2017-09-19 03:58:15", "dateUpdate": "2018-06-27 00:13:07", "id": 4180, "logisticsId": 386, "minPrice": 98.00, "minScore": 0, "name": "条纹毛衣", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/c86d0179ad9b1c8f8ad777547d425440.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 309, "weight": 0.00 }, { "categoryId": 1873, "characteristic": "经典设计女童裤", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:56:48", "dateStart": "2017-09-19 03:54:01", "dateUpdate": "2018-06-30 12:11:10", "id": 4178, "logisticsId": 386, "minPrice": 85.00, "minScore": 0, "name": "预售 {三天到货} 爆款女童裤", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/748b96e064ccab047c1ca0d93fb8173a.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 1154, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "粉色可爱的外搭毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:53:58", "dateStart": "2017-09-19 03:40:49", "dateUpdate": "2018-06-29 14:55:44", "id": 4177, "logisticsId": 386, "minPrice": 79.00, "minScore": 0, "name": "粉色外搭毛衣", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/a979545e4160b58906a5265e7f940360.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 330, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "简答大方款毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:40:46", "dateStart": "2017-09-19 03:39:19", "dateUpdate": "2018-06-30 13:30:36", "id": 4175, "logisticsId": 386, "minPrice": 85.00, "minScore": 0, "name": "简单款毛衣", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/66896d3edd3a14d20d8e0f0153ef3bab.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 306, "weight": 0.00 }, { "categoryId": 1873, "characteristic": "怎么搭配都好看的男童裤", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:39:17", "dateStart": "2017-09-19 03:32:01", "dateUpdate": "2018-06-28 09:11:20", "id": 4174, "logisticsId": 386, "minPrice": 79.00, "minScore": 0, "name": "个性男童裤", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 119.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/3e1d9b4200ba4ea4fe0c607d5b67b2aa.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 565, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "时尚夹克外套", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:31:59", "dateStart": "2017-09-19 03:29:11", "dateUpdate": "2018-06-29 17:40:15", "id": 4172, "logisticsId": 386, "minPrice": 119.00, "minScore": 0, "name": "时尚夹克外套", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/ab494657dc92b9c4c8aa3a0e81907dae.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 298, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "黑白配毛衣，永不过时", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:29:08", "dateStart": "2017-09-19 03:27:01", "dateUpdate": "2018-06-28 17:54:07", "id": 4171, "logisticsId": 386, "minPrice": 79.00, "minScore": 0, "name": "黑白配毛衣", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 139.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/97efdbbe8b261a7a09b4cf1df2defd7f.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 0, "userId": 951, "views": 313, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "含羊绒特别舒服的爆款男童毛衣", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-19 03:18:31", "dateStart": "2017-09-19 03:09:41", "dateUpdate": "2018-06-29 23:13:03", "id": 4170, "logisticsId": 386, "minPrice": 98.00, "minScore": 0, "name": "男童爆款毛衣", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/6feb0640d20a87bf6a567b2d863f0f36.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 5, "userId": 951, "views": 706, "weight": 0.00 }, { "categoryId": 1872, "characteristic": "好看的款说没就没了哦，要的赶紧", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-18 20:30:53", "dateStart": "2017-09-18 20:23:54", "dateUpdate": "2018-06-30 13:30:41", "id": 4161, "logisticsId": 386, "minPrice": 98.00, "minScore": 0, "name": "刺绣外套", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/bd1eb71ec3de605655f3d83723a225be.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 783, "weight": 0.00 }, { "categoryId": 1907, "characteristic": "两件套套裙，上身效果不错", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-18 20:04:42", "dateStart": "2017-09-18 19:57:31", "dateUpdate": "2018-06-30 11:33:53", "id": 4160, "logisticsId": 386, "minPrice": 129.00, "minScore": 0, "name": "套裙", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/4dab0bf4842cb53981d10df926aed40d.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 1338, "weight": 0.00 }, { "categoryId": 1873, "characteristic": "中厚阔腿裤", "commission": 0.00, "commissionType": 0, "dateAdd": "2017-09-18 19:36:40", "dateStart": "2017-09-18 19:31:17", "dateUpdate": "2018-06-30 13:31:38", "id": 4159, "logisticsId": 386, "minPrice": 89.00, "minScore": 0, "name": "阔腿裤", "numberFav": 0, "numberGoodReputation": 0, "numberOrders": 0, "originalPrice": 159.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2017/09/18/c444552d4a2c96871e98abfaf97b5819.jpg", "pingtuan": false, "pingtuanPrice": 0.00, "propertyIds": ",870,871,", "recommendStatus": 0, "recommendStatusStr": "普通", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 30, "userId": 951, "views": 1571, "weight": 0.00 }],
    scrollTop: "0",
    loadingMoreHidden: true,

    hasNoCoupons: true,
    coupons: [],
    searchInput: '',
    currentSize: 0,
    words: []
  },

  tabClick: function (e) {

  },
  //事件处理函数
  swiperchange: function (e) {
    console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetailsTap: function (e) {
    console.log(e.currentTarget)
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  tapBanner: function (e) {
    console.log(e.currentTarget)
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  bindTypeTap: function (e) {
    console.log(123);
    this.setData({
      selectCurrent: e.index
    })
  },
  doLoadData(currendSize, PAGE_SIZE) {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;


    var goods = that.data.goods;
    for (var i = 0; i < that.data.goodsList.length; i++) {
      goods.push(that.data.goodsList[i]);
    }
    that.setData({
      goods: goods,
    });
    wx.hideLoading();
    register.loadFinish(that, true);

  },
  //模拟刷新数据
  refresh: function () {

  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 20);
  },
  onLoad: function () {
    var that = this

    var _this = this;
    register.register(this);
    //获取words  
    this.doLoadData(0, 20);

    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
      data: {
        key: 'mallName'
      },
      success: function (res) {
        if (res.data.code == 404) {
          wx.showModal({
            title: '提示',
            content: '请在后台添加 banner 轮播图片',
            showCancel: false
          })
        } else {
          that.setData({
            banners: res.data.data
          });
        }
      }
    })
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
      success: function (res) {
        var categories = [{ id: 0, name: "全部" }];
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            categories.push(res.data.data[i]);
          }
        }
        that.setData({
          categories: categories,
          activeCategoryId: 0
        });
        that.getGoodsList(0);
      }
    })
    that.getCoupons();
    that.getNotice();
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    console.log(categoryId)
    var goods = [];
    var that = this;
    for (var i = 0; i < that.data.goodsList.length; i++) {
      goods.push(that.data.goodsList[i]);
    }
    that.setData({
      goods: goods,
    });
  },
  getCoupons: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/coupons',
      data: {
        type: ''
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            hasNoCoupons: false,
            coupons: res.data.data
          });
        }
      }
    })
  },
  gitCoupon: function (e) {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/fetch',
      data: {
        id: e.currentTarget.dataset.id,
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 20001 || res.data.code == 20002) {
          wx.showModal({
            title: '错误',
            content: '来晚了',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 20003) {
          wx.showModal({
            title: '错误',
            content: '你领过了，别贪心哦~',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 30001) {
          wx.showModal({
            title: '错误',
            content: '您的积分不足',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 20004) {
          wx.showModal({
            title: '错误',
            content: '已过期~',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 0) {
          wx.showToast({
            title: '领取成功，赶紧去下单吧~',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('mallName') + '——' + app.globalData.shareProfile,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getNotice: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
      data: { pageSize: 5 },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            noticeList: res.data.data
          });
        }
      }
    })
  },
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })

  },
  toSearch: function () {
    console.log(12);
    this.getGoodsList(this.data.activeCategoryId);
  }
})
