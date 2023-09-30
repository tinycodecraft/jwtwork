import React, { useRef, useState, type FunctionComponent } from 'react'
import { Group, Text, useMantineTheme, rem, Image, SimpleGrid } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, type DropzoneProps, MIME_TYPES, type FileWithPath } from '@mantine/dropzone'

export const DropFormGroup: FunctionComponent = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme()
  // use to invoke FileManager for upload i.e. openRef.current()
  const openRef = useRef<() => void>(null)
  const [files, setFiles] = useState<FileWithPath[]>([])
  const ondrop = (drops: FileWithPath[]) => {
    setFiles(drops)
    console.log('files being accepted', drops)
  }
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <div className='block' key={`${file.name}-${index}`}>
        
        <Image key={index} src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />
        
      </div>
    )
  })

  return (
    <div className='column'>
      <h3 className='title is-4'>File Drop Zone</h3>
      <h5 className='subtitle is-5'>Only image will be accepted</h5>
      <Dropzone
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

          <div>
            <Text size='xl' inline>
              Drag images here or click to select files
            </Text>
            <Text size='sm' color='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  )
}
