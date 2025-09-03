if (!cc._RF.push(module, "cbd06HrkTNFtbM/q+8lJvnc", "AnimParticleSystemUtils")) {
  exports.__esModule = true;
  // 根據加速度與時間計算位移距離
  exports.getAccelerationDistance = function (K, g) {
    return K * 0.5 * g * g;
  };
  // 在指定範圍內回傳隨機值
  exports.getRandomFromRange = function (K, g) {
    return K + g * (Math.random() - 0.5) * 2;
  };
  cc._RF.pop();
}