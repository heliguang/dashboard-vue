<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <el-checkbox v-model="showPassword" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.reviewer') }}
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.account')" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showPassword" :label="$t('table.password')" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.role')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="userForm" :rules="rules" :model="curUser" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.account')" prop="account">
          <el-input v-model="curUser.account" />
        </el-form-item>
        <el-form-item :label="$t('table.password')" prop="password">
          <el-input v-model="curUser.password" />
        </el-form-item>
        <el-form-item :label="$t('table.role')" prop="role">
          <el-select v-model="curUser.role" class="filter-item" placeholder="Please Select">
            <el-option v-for="item in roles" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleReplaceUser()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { replaceUser, deleteUser, getAllUser } from '@/api/admin'

const EMPTY_USER = {
  account: '',
  password: '',
  role: ''
}

export default {
  name: 'ComplexTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      roles: null,
      listLoading: true,
      showPassword: true,
      curUser: EMPTY_USER,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      rules: {
        account: [{ required: true, message: 'account is required', trigger: 'change' }],
        password: [{ required: true, message: 'password is required', trigger: 'change' }],
        role: [{ required: true, message: 'role is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAllUser().then(response => {
        this.list = response.users
        this.roles = response.roles
        this.listLoading = false
      })
    },
    resetCurUser() {
      this.curUser = EMPTY_USER
    },
    handleCreate() {
      this.resetCurUser()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.curUser = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    handleReplaceUser() {
      console.log('replace user')
      console.log(this.curUser)
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          replaceUser(this.curUser).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleDelete(row) {
      console.log('handle user')
      console.log(row.account)
      deleteUser({ 'account': row.account }).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}
</script>
