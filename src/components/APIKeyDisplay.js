
import { ClipboardIcon, KeyIcon, ArrowPathIcon } from '@heroicons/react/20/solid'

export default function APIKeyDisplay({
    apiKey,
    onRegenerate,
}) {
  return (
    <div>
      <h1 className="text-lg font-bold">API Key</h1>
      <p>Don't share this key with other people.</p>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="apiKey"
            id="apiKey"
            disabled
            value={apiKey ?? 'No API Key'}
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:bg-gray-200"
            onClick={
                () => {
                    // copy to clipboard
                    navigator.clipboard.writeText(apiKey)
                    alert('Copied to clipboard!')
                }
            }
        >
          <ClipboardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Copy</span>
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:bg-gray-200"
        onClick={onRegenerate}
       >
          <ArrowPathIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}
