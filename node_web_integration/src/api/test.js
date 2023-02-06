/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-13 13:26:14
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-13 13:26:14
 */
import request from "../utils/request";
//小目标检测
export function calculationSmall(data) {
  return request({
    url: "image-detect/tiny-obj-detect",
    method: "post",
    data,
  });
}