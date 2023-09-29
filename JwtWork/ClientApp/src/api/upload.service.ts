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
        fdata.append(e.name, e)
      })
    }

    const { data } = await this.$http.post<FileUploadSummaryState>(`SimpleUpload/connectionid=${encodeURIComponent(datainput.connectionId)}`, fdata, {
      onUploadProgress: (progress) => {
        if (progress.total) report((progress.loaded / progress.total) * 100)
      },
    })
    return data
  }
}

export const UploadApi = UploadService.Instance
