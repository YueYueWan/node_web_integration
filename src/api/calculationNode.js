/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-02-02 13:42:44
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-02 13:42:48
 */
import request from "@/service/request";
//通用目标检测
export function calculationNormal(data) {
  return request({
    url: "/caculation/normal",
    method: "post",
    data,
  });
}
//火点目标检测
export function calculationFire(data) {
  return request({
    url: "/caculation/fire",
    method: "post",
    data,
  });
}
//小目标检测
export function calculationSmall(data) {
  return request({
    url: "/caculation/small",
    method: "post",
    data,
  });
}
//姿势检测
export function calculationGesture(data) {
  return request({
    url: "/caculation/gesture",
    method: "post",
    data,
  });
}
