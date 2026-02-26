interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  basePath: string;
  itemLabel: string;
}

export function Pagination({
  page,
  totalPages,
  total,
  basePath,
  itemLabel,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Página {page} de {totalPages} ({total} {itemLabel})
      </p>
      <div className="flex gap-2">
        {page > 1 && (
          <a
            href={`${basePath}&page=${page - 1}`}
            className="text-sm text-primary hover:underline"
          >
            Anterior
          </a>
        )}
        {page < totalPages && (
          <a
            href={`${basePath}&page=${page + 1}`}
            className="text-sm text-primary hover:underline"
          >
            Próxima
          </a>
        )}
      </div>
    </div>
  );
}
