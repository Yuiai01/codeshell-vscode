/* eslint-disable */
import { workspace } from 'vscode'
import { FetchStream } from './FetchStream'
import AbortController from 'abort-controller'

let abortController = new AbortController()

export async function stopEventStream() {
  abortController.abort()
}

export async function postEventStream(
  prompt: string,
  msgCallback: (data: string) => any,
  doneCallback: () => void,
  errorCallback: (err: any) => void
) {
  const serverAddress = workspace
    .getConfiguration('CodeShell')
    .get('ServerAddress') as string

  const uri = '/stream_chat'
  const body = {
    prompt: '生成一段javascript版本的斐波那契数列',
    // prompt: prompt,
    user: 100002,
  }

  abortController = new AbortController()
  new FetchStream({
    url: serverAddress + uri,
    requestInit: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    },
    onmessage: msgCallback,
    ondone: doneCallback,
    onerror: errorCallback,
  })
}
