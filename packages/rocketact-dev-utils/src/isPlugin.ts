const isPlugin = (packageName: string): boolean => {
  return !!packageName.match(/^rocketact-plugin-([\w-])+$/);
};

export { isPlugin };
