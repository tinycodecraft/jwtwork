import type { UploadDataInput, FileUploadSummaryState } from 'src/fragments/types'
import { BaseService } from './base.service'


class UploadService extends BaseService {
  private static _uploadService: UploadService
  private static _controller = 'files'

  private constructor(name: string) {
    super(name)
  }

  public static get Instance(): UploadService {
    return this._uploadService || (this._uploadService = new this(this._controller))
  }

  public async uploadAsync(datainput: UploadDataInput, report: (value: number) => void): Promise<FileUploadSummaryState> {
    const fdata = new FormData()
    
    if (datainput && datainput.files && datainput.files.length > 0) {
      datainput.files.forEach((e) => {
        fdata.append("Files", e)
        console.log(`the file is here:`,e)
      })
    }

    const  uploadParms = new URLSearchParams({
      connectionid: datainput.connectionId,
      type: 'image'
    })

    const { data } = await this.$http.post<FileUploadSummaryState>(`SimpleUpload?${uploadParms.toString()}`, fdata, {
      headers:{
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progress) => {
        // Please note that progress is working if you specify the network to more slow connection (e.g. 3G)
        if (progress.total) report((progress.loaded / progress.total) * 100)
      },
    })
    return data
  }
}

export const UploadApi = UploadService.Instance
