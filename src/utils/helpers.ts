export function downloadJson(filename: string, obj: any): void {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidGA4Id(id: string): boolean {
  return /^G-[A-Z0-9]+$/i.test(id);
}

export function nonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidEventName(name: string): boolean {
  return /^[a-z0-9_]+$/.test(name);
}
