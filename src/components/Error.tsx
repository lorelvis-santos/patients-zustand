type ErrorProps = {
  message: string | undefined
}

export default function Error({message}: ErrorProps) {
  return message ? (
    <p className="text-red-600 mt-2 text-sm">{message}</p>
  ) : <></>
}