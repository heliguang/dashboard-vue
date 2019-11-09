<template>
  <div class="app-container">
    <div class="editor-container">
      <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('services.file.id')" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('services.file.name')" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('services.file.md5')" width="230px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showPassword" :label="$t('services.file.size')" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('services.file.actions')" align="center" width="330px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handleCopy(row.account, $event)">
            {{ $t('services.file.copyName') }}
          </el-button>
          <el-button size="mini" type="primary" @click="handleCopy(row.password, $event)">
            {{ $t('services.file.copyMD5') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('services.file.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'
import { replaceUser, deleteUser, getAllUser } from '@/api/admin'
import clip from '@/utils/clipboard' // use clipboard directly

const EMPTY_USER = {
  account: '',
  password: '',
  role: ''
}

export default {
  name: 'ComplexTable',
  components: { Dropzone },
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
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    },
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>
