from util import queries, util


def add_10_users():
    for i in range(1, 10):
        try:
            queries.add_user(
                f"test{i}",
                f"test{i}@test.pl",
                util.hash_password(f"Test{i}"),
                util.get_current_time()
            )
            print("sucessfully created users")
        except:
            print("user already exists")
