/** Scalable sculptural folds, rendered without a client canvas runtime. */
export function SoftWave({ id, className, lilac = false }: { id: string; className?: string; lilac?: boolean }) {
  return <svg className={className} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-surface`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lilac ? '#f4e9fc' : '#fffdf9'}/><stop offset=".42" stopColor={lilac ? '#dfc4f2' : '#fff8f0'}/><stop offset="1" stopColor={lilac ? '#d8b9ec' : '#fff8f0'}/></linearGradient>
      <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lilac ? '#b88dd0' : '#d4bbca'} stopOpacity=".35"/><stop offset="1" stopColor="#fff8f0" stopOpacity="0"/></linearGradient>
    </defs>
    <path d="M0 76C165-10 241 33 391 92S700 125 873 60 1150 145 1440 34V160H0Z" fill={`url(#${id}-surface)`}/>
    <path d="M0 76C165-10 241 33 391 92S700 125 873 60 1150 145 1440 34" fill="none" stroke={lilac ? '#fbf5ff' : '#fffefd'} strokeWidth="4"/>
    <path d="M0 84C165-2 241 41 391 100S700 133 873 68 1150 153 1440 42V160H0Z" fill={`url(#${id}-fold)`}/>
  </svg>;
}
