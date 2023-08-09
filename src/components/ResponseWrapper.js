const DefaultLoadingComponent = ({ props }) => (
  <div {...props}>Carregando...</div>
);
const DefaultErrorComponent = ({ error, ...restProps }) => (
  <div {...restProps}>{String(error)}</div>
);
const DefaultEmptyComponent = ({ ...restProps }) => (
  <div {...restProps}>Vazio</div>
);
const DefaultDataComponent = ({ children }) => <ul>{children}</ul>;
const DefaultDataItemComponent = ({ item, ...restProps }) => (
  <li {...restProps}>
    {Object.entries(item || {}).map((entry) => (
      <p>
        <strong>{entry[0]}</strong>: {String(entry[1])}
      </p>
    ))}
  </li>
);

const ResponseWrapper = ({
  loading,
  error,
  data,
  list = false,
  listKey = "_id",
  loadingComponent,
  errorComponent,
  dataComponent,
  dataItemComponent,
  emptyComponent,
  children,
  ...restProps
}) => {
  if (loading) {
    const LoadingComponent = loadingComponent ?? DefaultLoadingComponent;
    return <LoadingComponent {...restProps} />;
  }

  if (error) {
    const ErrorComponent = errorComponent ?? DefaultErrorComponent;
    let err = error;
    if (err.message) err = err.message
    return <ErrorComponent error={err} {...restProps} />;
  }

  if (list) {
    if (!data || data.length < 1) {
      const EmptyComponent = emptyComponent ?? DefaultEmptyComponent;
      return <EmptyComponent {...restProps} />;
    }

    const DataComponent = dataComponent ?? DefaultDataComponent;
    const DataItemComponent = dataItemComponent ?? DefaultDataItemComponent;
    return (
      <DataComponent>
        {data.map((item) => (
          <DataItemComponent key={item[listKey]} item={item} {...restProps} />
        ))}
      </DataComponent>
    );
  }

  return children;
};

export default ResponseWrapper;
