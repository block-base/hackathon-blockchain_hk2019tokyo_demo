<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      Re-Encryption
    </el-menu-item>
      <el-menu-item index="4" style="float: right;" :route="{ path: '/' }">
        <span>Use Ethereum</span>
      </el-menu-item>
  </el-menu>
</template>

