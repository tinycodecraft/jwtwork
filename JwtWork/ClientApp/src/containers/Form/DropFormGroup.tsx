import React, { useRef, useState, type FunctionComponent, useCallback } from 'react'
import { Group, Text, useMantineTheme, rem, Image, SimpleGrid } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, type DropzoneProps, MIME_TYPES, type FileWithPath } from '@mantine/dropzone'
import { useAppDispatch, useAppSelector } from 'src/store'
import { UploadStatusEnum, setUploadStatus, uploadFileAsync } from 'src/store/uploadSlice'
import { useEventListener } from '@mantine/hooks'
import { canWait } from 'src/utils'

export const DropFormGroup: FunctionComponent = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme()
  // use to invoke FileManager for upload i.e. openRef.current()
  const openRef = useRef<() => void>(null)
  const [files, setFiles] = useState<FileWithPath[]>([])
  const connectionId = useAppSelector<string | undefined>((state) => state.auth.connectionId)
  const uploadFiles = useAppSelector<string[] | undefined>((state) => state.file?.filePaths ?? [])
  const uploadDescs = useAppSelector<string[]|undefined>((state)=> state.file.fileDescs ?? [])
  const dropstatus = useAppSelector<UploadStatusEnum>((state) => state.file?.status ?? UploadStatusEnum.IDLE)
  const dispatch = useAppDispatch()
  const dispatchUploadStatus = useCallback(
    (status: UploadStatusEnum) => {
      return dispatch(setUploadStatus(status))
    },
    [dispatch],
  )
  const ondrop = (drops: FileWithPath[]) => {
    setFiles(drops)
    console.log('files being accepted', drops)
  }
  const onupload = useCallback(async () => {
    if (connectionId) {
      await dispatchUploadStatus(UploadStatusEnum.PROCESSING)
      await canWait(500) // working
      await dispatch(uploadFileAsync({ connectionId, files }))

    } else {
      dispatchUploadStatus(UploadStatusEnum.FAIL)
    }
  }, [connectionId, files])

  const oncancel = useCallback(async () => {
    await dispatchUploadStatus(UploadStatusEnum.IDLE)
    setFiles([])

  },[dropstatus])

  const uploadRef = useEventListener('click', onupload)
  const cancelRef =useEventListener('click',oncancel)

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <div className='block' key={`${file.name}-${index}`}>
        <button className='delete is-large z-10 float-right top-10' onClick={() => setFiles(files.filter((f) => f !== files[index]))}></button>
        <Image key={index} src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />
      </div>
    )
  })
  // 1024**2 == 1M
  return (
    <div className='column'>
      <div className='level-right'>
        <p className='level-item'>
          <h3 className='title is-4'>File Drop Zone</h3>
        </p>
        <p className='level-item'>
          <a className='button is-success' {...{ disabled: !files || files.length == 0 || dropstatus!== UploadStatusEnum.IDLE }} ref={uploadRef}>
            Upload
          </a>
          <a className='button is-light' {...{ disabled: !(dropstatus ===UploadStatusEnum.SUCCESS || dropstatus===UploadStatusEnum.FAIL)}} ref={cancelRef}>Cancel</a>
        </p>
      </div>

      <Dropzone
        {...{ loading: dropstatus === UploadStatusEnum.PROCESSING }}
        {...{disabled: dropstatus !== UploadStatusEnum.IDLE}}
        
        openRef={openRef}
        onDrop={ondrop}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={20 * 1024 ** 2}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.gif, MIME_TYPES.png, MIME_TYPES.mp4]}
        {...props}
      >
        <Group position='center' spacing='xl' style={{ minHeight: rem(220), pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size='3.2rem' stroke={1.5} color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size='3.2rem' stroke={1.5} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size='3.2rem' stroke={1.5} />
          </Dropzone.Idle>
          {dropstatus === UploadStatusEnum.IDLE && (
            <div>
              <Text size='xl' inline>
                Drag images here or click to select files
              </Text>
              <Text size='sm' color='dimmed' inline mt={7}>
                Attach as many files as you like, each file should not exceed 5mb
              </Text>
            </div>
          )}
          {dropstatus === UploadStatusEnum.SUCCESS && (
            <div>
              <Text size='xl' color='dimmed' inline mb={7}>
                Files below successfully uploaded:
              </Text>              
              {uploadFiles && uploadDescs &&
                uploadFiles.map((f, i) => (
                  <a key={`${f}${i}`} href={`${f}`}>{uploadDescs[i]}</a>

                ))}
            </div>
          )}
          {dropstatus === UploadStatusEnum.FAIL && (
            <div>
              <Text size='xl' inline>
                Your files could not be upload!!
              </Text>
            </div>
          )}
        </Group>
      </Dropzone>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  )
}
