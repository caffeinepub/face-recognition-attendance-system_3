import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type AttendanceRecord = {
    personId : Text;
    personName : Text;
    timestamp : Time.Time;
    status : Bool;
  };

  module AttendanceRecord {
    public func compare(record1 : AttendanceRecord, record2 : AttendanceRecord) : Order.Order {
      switch (Text.compare(record1.personId, record2.personId)) {
        case (#equal) { Int.compare(record1.timestamp, record2.timestamp) };
        case (other) { other };
      };
    };
  };

  let records = List.empty<AttendanceRecord>();

  public shared ({ caller }) func addRecord(personId : Text, personName : Text, status : Bool) : async () {
    let record : AttendanceRecord = {
      personId;
      personName;
      timestamp = Time.now();
      status;
    };
    records.add(record);
  };

  public query ({ caller }) func getAllRecords() : async [AttendanceRecord] {
    var array = records.toArray();
    array.sort();
  };

  public query ({ caller }) func getRecordsByDate(startTime : Time.Time, endTime : Time.Time) : async [AttendanceRecord] {
    records.filter(
      func(record) {
        record.timestamp >= startTime and record.timestamp <= endTime
      }
    ).toArray();
  };
};
