<!--
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-02-01 17:48:56
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-02 16:25:57
-->
<template>
  <div class="parent">
    <h1 class="title">功能演示</h1>
    <div class="group_btn">
      <el-button
        :style="{ background: currentIndex === index ? '#337ecc' : '' }"
        size="large"
        type="primary"
        @click="changeType(item, index)"
        v-for="(item, index) in buttonGroup"
        :key="index"
        >{{ item.text }}</el-button
      >
    </div>
    <div class="ai-contanier">
      <div class="tech-recognition-content">
        <div class="tech-img-content">
          <div class="tech-canvas-container">
            <!-- loading样式 -->
            <div class="scan-div" v-if="loading">
              <div class="demo-loading">
                <div class="demo-loading-img"></div>
                <div class="demo-loading-text">图片解析中…</div>
              </div>
            </div>
            <!-- 解析错误样式 -->
            <div class="demo-data-error-msg" v-if="errorLoading">
              <img
                src="//ai-public-console.cdn.bcebos.com/portal-pc-static/1671012338403/images/demo/err.png"
                alt=""
                class="error-img"
              />
              <div class="error-text">图片解析错误</div>
            </div>
            <!-- 输入图片网址解析 -->
            <div class="image-input">
              <div class="image-input-container">
                <input
                  v-if="currentType !== 'normal'"
                  type="text"
                  id="url"
                  spallcheck="false"
                  placeholder="请输入网络图片URL"
                  class="image-url"
                  v-model="urlValue"
                />
                <button
                  v-if="currentType !== 'normal'"
                  class="image-button"
                  @click="calculationA"
                >
                  检测
                </button>
                <div class="image-text" v-if="currentType !== 'normal'">或</div>
                <label class="image-local" style="width: 116px"
                  ><input
                    type="file"
                    @change="fileUploadFunc"
                    accept="image/png, image/bmp, image/jpg, image/jpeg"
                    class="image-local-input"
                  />
                  本地上传
                </label>
                <div></div>
              </div>
              <div class="image-notice">
                此处仅供功能展示，图片类型支持PNG、JPG、JPEG、BMP，大小不超过2M。该接口实际能力的图片格式及大小要求以接口文档为准
              </div>
            </div>
            <canvas
              v-show="!loading"
              class="demo-canvas-centerlize"
              width="1680"
              height="1040"
              style="transform: translate(-50%, -50%) scale(0.5)"
            ></canvas>
          </div>
          <div class="image-select">
            <div
              @click="changeFormat(item, index)"
              class="image-select-item"
              v-for="(item, index) in arr"
              :key="index"
            >
              <img
                :class="[
                  'image-select-item-img',
                  index === selectIndex ? 'is-active' : '',
                ]"
                :src="item.url"
              />
            </div>
          </div>
        </div>
        <!-- 右侧接口数据结构 -->
        <div class="demo-json">
          <div class="demo-collapse">
            <div class="demo-collapse-item">
              <div
                class="demo-collapse-item-title demo-json-title"
                @click="exhibition('Request')"
              >
                Request
                <span
                  :class="[
                    'demo-collapse-item-arrow',
                    exhibitionType === 'Request' ? 'is-active' : '',
                  ]"
                ></span>
              </div>
              <div
                class="demo-collapse-item-cnt"
                :style="{
                  height: exhibitionType === 'Request' ? '554px' : 0,
                  opacity: exhibitionType === 'Request' ? 1 : 0,
                }"
              >
                <div class="demo-json-req">
                  <div class="demo-json-line">
                    Params
                    <div class="demo-json-text">image="图片的Base64编码"</div>
                    <div class="demo-json-text">returnMode=2</div>
                    <div class="demo-json-text">
                      0-渲染后的图片Base64编码字符串,1-图片中识别对象的分类和坐标（json格式）2-包含上面两种格式的输出
                    </div>
                  </div>
                  <div class="demo-json-line">
                    Post
                    <div class="demo-json-text">接口路由</div>
                  </div>
                  <div class="demo-json-line">
                    Header
                    <div class="demo-json-text">
                      header: Content-Type: "application/x-www-form-urlencoded"
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="demo-collapse-item">
              <div
                class="demo-collapse-item-title demo-json-title"
                @click="exhibition('Response')"
              >
                Response
                <span
                  :class="[
                    'demo-collapse-item-arrow',
                    exhibitionType === 'Response' ? 'is-active' : '',
                  ]"
                ></span>
              </div>
              <div
                class="demo-collapse-item-cnt"
                :style="{
                  height: exhibitionType === 'Response' ? '554px' : 0,
                  opacity: exhibitionType === 'Response' ? 1 : 0,
                }"
              >
                <div class="demo-json-res">
                  <div class="demo-json-content">
                    <!-- <el-form-item label="请求参数：" label-width="82px">
                      <div
                        class="logManage-textarea"
                        v-html="drawerData.requestParameter"
                      ></div>
                    </el-form-item> -->
                    <el-form-item label="" label-width="70px">
                      <div
                        class="logManage-textarea"
                        v-html="drawerData.responseParameter"
                      ></div>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  gestureData,
  normalData,
  smallData,
  fireData,
} from "../utils/pictureData";
import { ref, onMounted } from "vue";
import {
  calculationNormal,
  calculationFire,
  calculationSmall,
  calculationGesture,
} from "../api/calculationNode";
let selectIndex = ref(0);
let exhibitionType = ref("Response");
let buttonGroup = ref([
  { text: "破损红棕色绝缘子目标检测", type: "normal" },
  { text: "火点目标检测", type: "fire" },
  { text: "小目标检测", type: "small" },
  { text: "姿势目标检测", type: "gesture" },
]);
let form = ref({ uploadFile: {} });
let loading = ref(false);
let errorLoading = ref(false);
let urlValue = ref("");
let imageUrl = ref();
let fileName = ref();
let arr = ref(normalData);
let currentType = ref("normal");
let currentIndex = ref(0);
let drawerData = ref({ responseParameter: {}, requestParameter: {} });
// 初始化执行方法
onMounted(() => {
  let item = { url: arr.value[0].url };
  changeFormat(item, 0);
});
// 定义接口参数类型
const changeType = (item, index) => {
  currentType.value = item.type;
  currentIndex.value = index;
  if (currentType.value === "normal") {
    arr.value = normalData;
  } else if (currentType.value === "fire") {
    arr.value = fireData;
  } else if (currentType.value === "small") {
    arr.value = smallData;
  } else if (currentType.value === "gesture") {
    arr.value = gestureData;
  }
  let data = { url: arr.value[0].url };
  changeFormat(data, 0);
};

const calculationA = () => {
  errorLoading.value = false;
  let item = { url: urlValue.value };
  changeFormat(item, -1);
};
//目标检测
const calculation = async (data) => {
  errorLoading.value = false;
  loading.value = true;
  if (currentType.value === "normal") {
    const res = await calculationNormal({ image: data.base64, returnMode: 2 });
    // console.log("rescal=====", res);
    if (res.code === 0) {
      loading.value = false;
      let base = "data:image/jpeg;base64," + res.data.image;
      toCalculation({ url: base }, data.index);
      drawerData.value.responseParameter = res.data.label;
    } else {
      errorLoading.value = true;
      loading.value = false;
    }
  } else if (currentType.value === "fire") {
    const res = await calculationFire({ image: data.base64, returnMode: 2 });
    if (res.code === 0) {
      loading.value = false;
      let base = "data:image/jpeg;base64," + res.data.image;
      toCalculation({ url: base }, data.index);
      drawerData.value.responseParameter = res.data.label;
    } else {
      errorLoading.value = true;
      loading.value = false;
    }
  } else if (currentType.value === "small") {
    const res = await calculationSmall({ image: data.base64, returnMode: 2 });
    if (res.code === 0) {
      loading.value = false;
      let base = "data:image/jpeg;base64," + res.data.image;
      toCalculation({ url: base }, data.index);
      drawerData.value.responseParameter = res.data.label;
    } else {
      errorLoading.value = true;
      loading.value = false;
    }
  } else if (currentType.value === "gesture") {
    const res = await calculationGesture({ image: data.base64, returnMode: 2 });
    if (res.code === 0) {
      loading.value = false;
      let base = "data:image/jpeg;base64," + res.data;
      toCalculation({ url: base }, data.index);
      drawerData.value.responseParameter = "";
    } else {
      errorLoading.value = true;
      loading.value = false;
    }
  }
};

//上传图片
const fileUploadFunc = (event) => {
  errorLoading.value = false;
  form.value.uploadFile = "";
  const file = event.target.files[0]; //方便下文直接使用file代替e.target.files[0]
  const reader = new FileReader();
  form.value.uploadFile = event.target.files[0];
  // console.log("event.target.files[0]===", event.target.files);
  let result = event.target.files[0];
  //获取图片大小，字节
  if (file.size > 2068484) {
    alert("选择的图像文件不能超过2.0MB,请重新选择!");
    return;
  }
  //图片读取
  reader.onload = function (resultImg) {
    const img = new Image();
    const url = result;
    img.onload = function () {
      imageUrl.value = url; //图片链接
      // imgWidth = this.width;//图片宽
      // imgHeight = this.height;//图片高
      img.width = img.width < 1680 ? 1680 : img.width;
      img.height = img.height < 1040 ? 1040 : img.height;
    };
    img.onerror = function () {
      //todo图片加载失败的处理函数
      //例如：this.$message.error('图片加载失败，请重新上传');
    };
    img.src = url;
    console.log("img.src=====", url);
    console.log(resultImg.target.result, "AAAAAAAAAA");
    console.log("img.width=====", img.width);
    console.log("img.height=====", img.height);
    let base64data = resultImg.target.result;
    selectIndex.value = -1;
    const canvas = document.createElement("canvas"); //创建一个canvas元素
    // let anw = document.createAttribute("width");
    // let anh = document.createAttribute("height");

    canvas.style.border = "solid 1px red";

    canvas.width = img.width < 1680 ? 1680 : img.width; //把当前url对应的图片的宽度赋予canvas
    canvas.height = img.height < 1040 ? 1040 : img.height; //把当前url对应的图片的高度赋予canvas
    // canvas.setAttributeNode(anw);
    // canvas.setAttributeNode(anh);
    // const ctx = canvas.getContext("2d");
    console.log("canvas.width===+++", canvas.width);
    // ctx.drawImage(img, 0, 0, 3000, 5000); //在画布上一比一的画出img
    calculation({
      base64: base64data.replace("data:image/jpeg;base64,", ""),
      index: selectIndex,
    });
  };

  reader.onerror = function () {
    //todo图片上传失败的处理函数
    //例如：this.$message.error('图片上传失败，请重新上传');
  };
  reader.readAsDataURL(file);
  fileName.value = file.name;
};
// 定义接口参数类型
// 绘制图片
let toCalculation = (item) => {
  drawPicture(item.url);
};
let drawPicture = (url) => {
  // console.log("url====", url);
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  //创建图片
  var image = new Image();
  //设置图片地址
  image.src = url;
  // 必须要在onLoad之后再进行绘制图片，否则不会渲染
  image.onload = function () {
    //2个参数 图片的xy坐标
    ctx.drawImage(image, 0, 0, 1680, 1040);
    //4各参数 图片的起始坐标和宽高
    // ctx.drawImage(image, 100, 100, 500, 100);
    //参数 408, 81 切片的起始坐标， 147, 182 切片切掉原图的尺寸， 0, 0,切完之后切片的位置400, 400切完之后 切片的大小
    // ctx.drawImage(image, 408, 81, 147, 182, 0, 0, 400, 400);
  };
};
//右侧接口数据折叠
let exhibition = (type) => {
  // let arr = ["Request", "Response"];
  if (exhibitionType.value === type) {
    if (type === "Request") {
      exhibitionType.value = "Response";
    } else if (type === "Response") {
      exhibitionType.value = "Request";
    }
  } else {
    exhibitionType.value = type;
  }
};
const changeFormat = (item, index) => {
  getImageUrlBase64(item.url);

  selectIndex.value = index;
  // toCalculation({ url: "" }, index);
};
// 图片URL转base64
/**@url :图片服务器上的url
 * @img :图片url对应的图片
 * */
const getImageUrlBase64 = (url) => {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.crossOrigin = "anonymous"; //处理跨域，后端也要设置跨域处理才行
  img.src = url;
  img.onload = () => {
    return toBase64(img);
  };
};
const toBase64 = (img) => {
  const canvas = document.createElement("canvas"); //创建一个canvas元素
  // console.log("img.width=====", img.width);
  // console.log("img.height=====", img.height);
  canvas.width = img.width < 1680 ? 1680 : img.width; //把当前url对应的图片的宽度赋予canvas
  canvas.height = img.height < 1040 ? 1040 : img.height; //把当前url对应的图片的高度赋予canvas
  // canvas.width = img.width; //把当前url对应的图片的宽度赋予canvas
  // canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //在画布上一比一的画出img
  const base64 = canvas.toDataURL("image/jpeg"); //调用canvas的toDataURL获取.jpg的base64数据
  // console.log("toBase64==========", base64);
  // console.log("changeFormatbase64======", base64);
  calculation({
    base64: base64.replace("data:image/jpeg;base64,", ""),
    index: selectIndex,
  });
  return base64;
};
</script>
<style lang="css">
.scan-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 840px;
  height: 520px;
  background: url(../assets/images/black.webp) no-repeat;
  background-size: cover;
  /*背景大小为适应性布局*/
  cursor: pointer;
  /*鼠标样式为指针样式*/
  overflow: hidden;
  /*超出隐藏*/
}

.scan-div:before {
  /*之前添加，此处为扫描线*/
  content: "";
  /*内容*/
  position: absolute;
  left: 0;
  /*绝对定位*/
  width: 840px;
  height: 50px;
  background: url(../assets/images/black.webp) no-repeat;
  background-size: cover;
  filter: sepia(100%);
  /*使元素颜色更接近棕褐色*/
  opacity: 0;
}

.scan-div::before {
  /*悬停时*/
  opacity: 0.7;
  /*透明度*/
  animation: glitch 1.5s infinite linear;
  /*动画 : 名称 时间 重复 线性执行*/
}

@keyframes glitch {
  0% {
    top: 0;
    /*距上部*/
    background-position: 12px 0;
    /*X轴移动 y轴移动*/
  }

  20% {
    /* top 和background-position的Y轴应该成倒数，这样才能使
      扫描时的图片显示为背景相应位置的图片
    */
    top: 80px;
    background-position: -10px -80px;
  }

  40% {
    top: 160px;
    background-position: 6px -160px;
  }

  60% {
    top: 240px;
    background-position: -6px -240px;
  }

  80% {
    top: 320px;
    background-position: 10px -320px;
  }

  100% {
    top: 400px;
    background-position: -12px -400px;
  }
}
</style>
<style lang="less" scoped>
.parent {
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  .group_btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 40px;
  }

  .title {
    line-height: 46px;
    font-size: 30px;
    color: #000;
    letter-spacing: 0;
    text-align: center;
    margin: 40px auto;
  }

  .ai-contanier {
    display: block;

    .tech-recognition-content {
      position: relative;
      width: 100%;
      height: 654px;
      display: flex;
      justify-content: center;

      .tech-img-content {
        width: 840px;
        height: 100%;
        float: left;

        .tech-canvas-container {
          position: relative;
          width: 840px;
          height: 524px;
          background: #343434;

          .demo-loading {
            position: absolute;
            top: 150px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);

            .demo-loading-img {
              width: 90px;
              height: 90px;
              margin: 0 auto;
              background-image: url(//ai-public-console.cdn.bcebos.com/portal-pc-static/1671012338403/images/demo/loading.png);
            }

            .demo-loading-text {
              margin-top: 12px;
              font-size: 16px;
              color: #fff;
              text-align: center;
            }
          }

          .demo-data-error-msg {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;

            .error-text {
              max-width: 416px;
              margin-top: 12px;
              line-height: 26px;
              font-size: 16px;
              color: #fff;
            }
          }

          .demo-data-error-msg img {
            width: 90px;
          }

          .image-input {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100px;
            padding: 20px 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            z-index: 9;
            background: rgba(0, 0, 0, 0.5);

            .image-input-container {
              position: relative;
              width: 100%;
              height: 38px;
              font-size: 0;
              display: flex;
              flex-direction: row;

              .image-url {
                width: 492px;
                font-size: 14px;
                line-height: 36px;
                outline: none;
                text-indent: 11px;
                border-right: 0;
                display: inline-block;
                vertical-align: middle;
                height: 38px;
                line-height: 36px;
                color: #ccc;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                border: 1px solid #666;
                outline: none;
                background-color: rgba(0, 0, 0, 0.45);
              }

              .image-button {
                min-width: 116px;
                font-size: 14px;
                display: inline-block;
                vertical-align: middle;
                height: 38px;
                line-height: 36px;
                color: #ccc;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                border: 1px solid #666;
                outline: none;
                background-color: rgba(0, 0, 0, 0.45);
              }

              .image-text {
                display: inline-block;
                vertical-align: middle;
                margin: 0 30px;
                font-size: 16px;
                color: #ccc;
                line-height: 38px;
                background: transparent;
                border: none;
              }

              .image-local {
                width: 116px;
                font-size: 16px;
                line-height: 38px;
                text-align: center;
                color: #fff;
                background-color: #0073eb;
                border: none;

                .image-local-input {
                  width: 100%;
                  height: 100%;
                  display: none;
                }
              }
            }

            .image-notice {
              margin-top: 10px;
              color: #ccc;
              font-size: 12px;
            }
          }

          .demo-canvas-centerlize {
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform-origin: center;
            -moz-transform-origin: center;
            -ms-transform-origin: center;
            transform-origin: center;
          }
        }

        .image-select {
          padding: 20px 0 20px 20px;
          background-color: #ebebeb;
          display: flex;
          flex-direction: row;

          .image-select-item {
            position: relative;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            float: left;
            width: 144px;
            height: 90px;
            margin-right: 20px;
            cursor: pointer;

            .image-select-item-img {
              display: inline-block;
              width: 144px;
              height: 90px;
            }
          }

          .is-active {
            border: 2px solid #0073eb;
          }
        }
      }

      .demo-json {
        float: left;
        width: 340px;
        height: 100%;
        word-wrap: break-word;
        word-break: break-all;
        background-color: #fafafa;

        .demo-collapse {
          height: 100%;
          overflow: hidden;

          .demo-collapse-item {
            padding-top: 50px;

            .demo-json-title {
              font-size: 16px;
            }

            .demo-collapse-item-title {
              margin-top: -50px;
              border-top: 1px solid #e1e1e1;
              height: 50px;
              line-height: 50px;
              padding-left: 20px;
              position: relative;
              cursor: pointer;
            }

            .demo-collapse-item-arrow {
              position: absolute;
              top: 50%;
              right: 8px;
              -webkit-transform: translateY(-50%) rotate(0);
              -moz-transform: translateY(-50%) rotate(0);
              -ms-transform: translateY(-50%) rotate(0);
              transform: translateY(-50%) rotate(0);
              font-size: 16px;
              width: 12px;
              height: 16px;
              background: url(//ai-public-console.cdn.bcebos.com/portal-pc-static/1671012338403/images/demo/components/common-icon/arrow.png)
                no-repeat 50%;
              -moz-background-size: cover;
              background-size: cover;
              -webkit-transition: -webkit-transform 0.3s ease-in-out;
              transition: -webkit-transform 0.3s ease-in-out;
              -moz-transition: transform ease-in-out 0.3s,
                -moz-transform ease-in-out 0.3s;
              transition: transform 0.3s ease-in-out;
              transition: transform 0.3s ease-in-out,
                -webkit-transform 0.3s ease-in-out,
                -moz-transform 0.3s ease-in-out;
              -webkit-transform-origin: center center;
              -moz-transform-origin: center center;
              -ms-transform-origin: center center;
              transform-origin: center center;
            }

            .is-active {
              -webkit-transform: translateY(-50%) rotate(180deg);
              -moz-transform: translateY(-50%) rotate(180deg);
              -ms-transform: translateY(-50%) rotate(180deg);
              transform: translateY(-50%) rotate(180deg);
            }
          }

          .demo-collapse-item-cnt {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding-left: 20px;
            overflow-y: auto;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all ease-in-out 0.3s;
            transition: all 0.3s ease-in-out;
            height: 0;
            opacity: 0;

            .demo-json-req,
            .demo-json-res {
              overflow-y: auto;
              overflow-x: hidden;

              .demo-json-content {
                white-space: pre-wrap;
                font-size: 14px;
                color: #404040;
                line-height: 24px;
                margin-top: 8px;
              }
            }

            .demo-json-line {
              margin-top: 16px;

              .demo-json-text {
                width: 100%;
                margin-top: 10px;
                color: #666;
                line-height: 21px;
              }
            }

            .demo-json-req {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
