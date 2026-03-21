import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {
  type Category = {
    #beat;
    #samplePack;
  };

  type Service = {
    #musicProduction;
    #videoDirection;
    #videoEditing;
    #fullProject;
  };

  type Product = {
    id : Text;
    title : Text;
    description : Text;
    price : Text;
    previewAudioUrl : Text;
    buyLink : Text;
    category : Category;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    service : Service;
    message : Text;
    timestamp : Time.Time;
  };

  type Store = {
    products : Map.Map<Text, Product>;
    inquiries : Map.Map<Text, Inquiry>;
  };

  let store = Map.empty<Principal, Store>();

  func getStore(caller : Principal) : Store {
    switch (store.get(caller)) {
      case (null) {
        let newStore : Store = {
          products = Map.empty<Text, Product>();
          inquiries = Map.empty<Text, Inquiry>();
        };
        store.add(caller, newStore);
        newStore;
      };
      case (?actualStore) { actualStore };
    };
  };

  func fromTextCategory(category : Text) : Category {
    switch (category) {
      case ("beat") { #beat };
      case ("sample-pack") { #samplePack };
      case (_) { Runtime.trap("Invalid category") };
    };
  };

  public type ProductDTO = {
    title : Text;
    description : Text;
    price : Text;
    previewAudioUrl : Text;
    buyLink : Text;
    category : Text;
  };

  type InquiryDTO = {
    name : Text;
    email : Text;
    service : Service;
    message : Text;
  };

  public shared ({ caller }) func addProduct(product : ProductDTO) : async () {
    let store = getStore(caller);
    let id = product.title.concat(
      product.price.concat(
        product.category,
      ),
    );
    let category = fromTextCategory(product.category);
    let newProduct : Product = {
      id;
      title = product.title;
      description = product.description;
      price = product.price;
      previewAudioUrl = product.previewAudioUrl;
      buyLink = product.buyLink;
      category;
    };
    store.products.add(id, newProduct);
  };

  public shared ({ caller }) func removeProduct(id : Text) : async () {
    getStore(caller).products.remove(id);
  };

  public shared ({ caller }) func submitInquiry(inquiryDTO : InquiryDTO) : async () {
    let id = inquiryDTO.name.concat(inquiryDTO.email.concat(Time.now().toText()));
    let inquiry : Inquiry = {
      name = inquiryDTO.name;
      email = inquiryDTO.email;
      service = inquiryDTO.service;
      message = inquiryDTO.message;
      timestamp = Time.now();
    };
    getStore(caller).inquiries.add(id, inquiry);
  };

  public shared ({ caller }) func getAllInquiries() : async [Inquiry] {
    getStore(caller).inquiries.values().toArray();
  };
};
