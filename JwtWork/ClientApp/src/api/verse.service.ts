import type { UploadDataInput, FileUploadSummaryState, MantineQuery, DataVerseState } from 'src/fragments/types'
import { BaseService } from './base.service'


class VerseService extends BaseService {
  private static _verseService: VerseService
  private static _controller = 'dataverse'

  private constructor(name: string) {
    super(name)
  }

  public static get Instance(): VerseService {
    return this._verseService || (this._verseService = new this(this._controller))
  }

  public async getDataVerseAsync(query:MantineQuery): Promise<DataVerseState> {

    const { data } = await this.$http.post<DataVerseState>('Search', query);

    console.log(`data return`,data)

    return data;
  }

}

export const VerseApi = VerseService.Instance
