function CreateStoreMixin(stores) {

  var StoreMixin = {
    
    getInitialState: function() {
      return this.getStateFromStores(this.props);
    },

    componentDidMount: function() {
      for(var i=0; i<stores.length; i++) {
        stores[i].addChangeListener(this.handleStoresChanged)
      }
      this.setState(this.getStateFromStores(this.props));
    },

    componentWillUnmount: function() {
      for(var i=0; i<stores.length; i++) {
        stores[i].removeChangeListener(this.handleStoresChanged)
      }
    },

    handleStoresChanged: function() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    }
  };

  return StoreMixin;
}

module.exports = CreateStoreMixin;
